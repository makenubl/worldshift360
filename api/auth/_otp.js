import crypto from "node:crypto";

export const OTP_TTL_SEC = 10 * 60;
const MIN_ACCOUNT_AGE = 13;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isProduction = () => process.env.VERCEL_ENV === "production";
const getOtpSecret = () => process.env.OTP_SECRET || "";

const safeEqual = (a, b) => {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
};

const hashOtp = (secret, nonce, otp) =>
  crypto
    .createHash("sha256")
    .update(`${secret}:${nonce}:${otp}`)
    .digest("hex");

const signPayload = (secret, payloadEncoded) =>
  crypto
    .createHmac("sha256", secret)
    .update(payloadEncoded)
    .digest("hex");

export const validateEmail = (email) => EMAIL_REGEX.test((email || "").trim().toLowerCase());

export const parseAgeFromDob = (dobValue) => {
  if (!dobValue) return 0;
  const birthDate = new Date(dobValue);
  if (Number.isNaN(birthDate.getTime())) return 0;
  const now = new Date();
  let age = now.getFullYear() - birthDate.getFullYear();
  const monthDiff = now.getMonth() - birthDate.getMonth();
  const birthdayPassed = monthDiff > 0 || (monthDiff === 0 && now.getDate() >= birthDate.getDate());
  if (!birthdayPassed) age -= 1;
  return Math.max(0, age);
};

export const canCreateAccountFromDob = (dobValue) => parseAgeFromDob(dobValue) >= MIN_ACCOUNT_AGE;

export const createOtpCode = () => String(crypto.randomInt(100000, 1000000));

export const createOtpSession = ({ email, otp }) => {
  const secret = getOtpSecret();
  if (!secret) throw new Error("OTP secret is not configured");

  const normalizedEmail = email.trim().toLowerCase();
  const nonce = crypto.randomBytes(10).toString("hex");
  const payload = {
    v: 1,
    email: normalizedEmail,
    exp: Date.now() + OTP_TTL_SEC * 1000,
    nonce,
    codeHash: hashOtp(secret, nonce, otp),
  };

  const payloadEncoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = signPayload(secret, payloadEncoded);
  return `${payloadEncoded}.${signature}`;
};

export const verifyOtpSession = ({ email, otp, sessionToken }) => {
  const secret = getOtpSecret();
  if (!secret) return { ok: false, message: "OTP service is not configured." };
  if (!sessionToken || !otp) return { ok: false, message: "Missing OTP session data." };

  const [payloadEncoded, signature] = sessionToken.split(".");
  if (!payloadEncoded || !signature) return { ok: false, message: "Invalid OTP session." };

  const expectedSignature = signPayload(secret, payloadEncoded);
  if (!safeEqual(signature, expectedSignature)) return { ok: false, message: "Invalid OTP signature." };

  let payload;
  try {
    payload = JSON.parse(Buffer.from(payloadEncoded, "base64url").toString("utf8"));
  } catch {
    return { ok: false, message: "Invalid OTP payload." };
  }

  if (Date.now() > Number(payload.exp)) return { ok: false, message: "OTP expired. Request a new one." };

  const normalizedEmail = (email || "").trim().toLowerCase();
  if (!normalizedEmail || normalizedEmail !== payload.email) {
    return { ok: false, message: "OTP email mismatch. Request a new OTP." };
  }

  const candidateHash = hashOtp(secret, payload.nonce, otp.trim());
  if (!safeEqual(candidateHash, payload.codeHash)) {
    return { ok: false, message: "Invalid OTP. Try again." };
  }

  return { ok: true, message: "Email verified." };
};

export const sendOtpEmail = async ({ name, email, otp }) => {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.OTP_FROM_EMAIL;
  const fromName = process.env.OTP_FROM_NAME || "Rewire";
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpSecure = process.env.SMTP_SECURE === "true";
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpConfigured =
    (gmailUser && gmailAppPassword) || (smtpHost && smtpUser && smtpPass && Number.isFinite(smtpPort));

  const subject = "Your Rewire OTP code";
  const html = `
    <div style="font-family: Inter, Arial, sans-serif; padding: 20px; color: #111827;">
      <h2 style="margin: 0 0 12px; color: #111827;">Rewire Verification Code</h2>
      <p style="margin: 0 0 12px;">Hi ${name || "there"},</p>
      <p style="margin: 0 0 14px;">Use this one-time code to verify your Rewire account:</p>
      <div style="font-size: 28px; letter-spacing: 6px; font-weight: 700; margin: 8px 0 14px; color: #0f766e;">${otp}</div>
      <p style="margin: 0; color: #4b5563;">This code expires in 10 minutes.</p>
    </div>
  `;
  const text = `Rewire OTP: ${otp}\nThis code expires in 10 minutes.`;

  const sendViaSmtp = async () => {
    if (!smtpConfigured) {
      return { ok: false, message: "SMTP email provider is not configured." };
    }

    try {
      const nodemailer = (await import("nodemailer")).default;
      const transport = gmailUser
        ? nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: gmailUser,
              pass: gmailAppPassword,
            },
          })
        : nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpSecure,
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          });

      const senderEmail = gmailUser ? `${fromName} <${gmailUser}>` : fromEmail || smtpUser;
      await transport.sendMail({
        from: senderEmail,
        to: email,
        subject,
        text,
        html,
      });

      return { ok: true, message: `OTP sent to ${email}.` };
    } catch (error) {
      return {
        ok: false,
        message: `Failed to deliver OTP email: ${error?.message || "SMTP error"}`,
      };
    }
  };

  if (!resendApiKey || !fromEmail) {
    if (smtpConfigured) {
      return sendViaSmtp();
    }

    if (!isProduction()) {
      return {
        ok: true,
        debugCode: otp,
        message: `Email provider not configured. Dev OTP: ${otp}`,
      };
    }
    return {
      ok: false,
      message:
        "OTP email service is not configured. Set RESEND_API_KEY + OTP_FROM_EMAIL, or set Gmail/SMTP variables.",
    };
  }

  const from = fromEmail.includes("<") ? fromEmail : `${fromName} <${fromEmail}>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject,
      html,
      text,
    }),
  });

  if (!response.ok) {
    const details = await response.text().catch(() => "");
    if (smtpConfigured) {
      const smtpResult = await sendViaSmtp();
      if (smtpResult.ok) {
        return { ok: true, message: `OTP sent to ${email}.` };
      }
      return {
        ok: false,
        message: details
          ? `Failed to deliver OTP email: ${details}. SMTP fallback failed: ${smtpResult.message}`
          : `Failed to deliver OTP email. SMTP fallback failed: ${smtpResult.message}`,
      };
    }
    return {
      ok: false,
      message: details ? `Failed to deliver OTP email: ${details}` : "Failed to deliver OTP email.",
    };
  }

  return { ok: true, message: `OTP sent to ${email}.` };
};
