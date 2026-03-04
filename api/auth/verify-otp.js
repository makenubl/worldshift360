import { validateEmail, verifyOtpSession } from "./_otp.js";

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method not allowed." });
  }

  const { email, otp, sessionToken } = req.body || {};
  const cleanEmail = (email || "").trim().toLowerCase();
  const cleanOtp = (otp || "").trim();

  if (!validateEmail(cleanEmail)) return res.status(400).json({ ok: false, message: "Valid email is required." });
  if (!/^\d{6}$/.test(cleanOtp)) return res.status(400).json({ ok: false, message: "OTP must be 6 digits." });
  if (!sessionToken) return res.status(400).json({ ok: false, message: "Missing OTP session token." });

  const verification = verifyOtpSession({ email: cleanEmail, otp: cleanOtp, sessionToken });
  if (!verification.ok) {
    return res.status(400).json({ ok: false, message: verification.message || "OTP verification failed." });
  }

  return res.status(200).json({ ok: true, message: verification.message || "Email verified." });
}
