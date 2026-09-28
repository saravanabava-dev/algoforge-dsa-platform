import nodemailer from "nodemailer";

let cachedTransporter = null;
let smtpConfigured = null;

function isSmtpConfigured() {
  if (smtpConfigured !== null) return smtpConfigured;
  smtpConfigured = Boolean(
    process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASSWORD
  );
  return smtpConfigured;
}

function getTransporter() {
  if (cachedTransporter) return cachedTransporter;
  cachedTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
  });
  return cachedTransporter;
}

/**
 * Sends the password reset email if SMTP is configured via environment
 * variables. If it isn't — the expected state for an offline college lab
 * with no mail server — this logs the reset link to the server console
 * instead of silently failing or pretending an email went out. This keeps
 * the feature genuinely usable offline (an admin/instructor with server
 * access can hand the student the link) without faking delivery.
 */
export async function sendPasswordResetEmail(toEmail, resetUrl) {
  if (!isSmtpConfigured()) {
    console.log("\n[mailer] SMTP is not configured (see backend/.env.example).");
    console.log(`[mailer] Password reset requested for: ${toEmail}`);
    console.log(`[mailer] Reset link (would normally be emailed): ${resetUrl}\n`);
    return { delivered: false, reason: "smtp_not_configured" };
  }

  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: toEmail,
      subject: "Reset your AlgoForge password",
      text: `We received a request to reset your AlgoForge password.\n\nReset it here: ${resetUrl}\n\nThis link expires in 1 hour. If you didn't request this, you can safely ignore this email.`,
      html: `<p>We received a request to reset your AlgoForge password.</p><p><a href="${resetUrl}">Reset your password</a></p><p>This link expires in 1 hour. If you didn't request this, you can safely ignore this email.</p>`,
    });
    return { delivered: true };
  } catch (err) {
    console.error("[mailer] Failed to send via SMTP:", err.message);
    console.log(`[mailer] Reset link (SMTP send failed, use this directly): ${resetUrl}`);
    return { delivered: false, reason: "smtp_error" };
  }
}
