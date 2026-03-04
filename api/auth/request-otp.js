import {
  OTP_TTL_SEC,
  canCreateAccountFromDob,
  createOtpCode,
  createOtpSession,
  sendOtpEmail,
  validateEmail,
} from "./_otp.js";

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method not allowed." });
  }

  const { mode, name, email, dob } = req.body || {};
  const authMode = mode === "login" ? "login" : "signup";
  const cleanName = (name || "").trim();
  const cleanEmail = (email || "").trim().toLowerCase();

  if (!validateEmail(cleanEmail)) return res.status(400).json({ ok: false, message: "Valid email is required." });
  if (authMode === "signup" && !cleanName) {
    return res.status(400).json({ ok: false, message: "Name is required." });
  }
  if (authMode === "signup" && (!dob || !canCreateAccountFromDob(dob))) {
    return res.status(400).json({ ok: false, message: "Date of birth is required (13+)." });
  }

  let otp;
  let sessionToken;
  try {
    otp = createOtpCode();
    sessionToken = createOtpSession({ email: cleanEmail, otp });
  } catch (error) {
    return res.status(503).json({
      ok: false,
      message: error?.message || "OTP service is not configured.",
    });
  }

  const emailResult = await sendOtpEmail({ name: cleanName || "there", email: cleanEmail, otp });
  if (!emailResult.ok) {
    return res.status(503).json({ ok: false, message: emailResult.message || "Unable to send OTP email." });
  }

  return res.status(200).json({
    ok: true,
    message: emailResult.message || `OTP sent to ${cleanEmail}.`,
    sessionToken,
    expiresInSec: OTP_TTL_SEC,
    ...(emailResult.debugCode ? { debugCode: emailResult.debugCode } : {}),
  });
}
