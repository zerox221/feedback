const { BrevoClient } = require("@getbrevo/brevo");
require("dotenv").config();

const brevo = new BrevoClient({
  apiKey: process.env.EMAIL_API_KEY,
});

const otpEmailTemplate = (username, otp) => {
  return ` <div style="
    font-family: Arial, sans-serif;
    max-width: 520px;
    margin: 0 auto;
    padding: 30px;
    color: #111;
  ">

    <h2 style="margin-bottom: 20px;">
      Consise
    </h2>

    <p>Hi ${username},</p>

    <p>
      Use the verification code below to complete your account setup:
    </p>

    <div style="
      background: #f5f7fa;
      border: 1px solid #e5e7eb;
      padding: 18px;
      text-align: center;
      margin: 24px 0;
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 8px;
    ">
      ${otp}
    </div>

    <p>
      This code will expire in <strong>2 minutes</strong>.
    </p>

    <p style="color: #666;">
      For your security, please do not share this code with anyone.
    </p>

    <p style="color: #666;">
      If you did not request this code, you can safely ignore this email.
    </p>

    <p style="margin-top: 30px;">
      Regards,<br>
      <strong>Consise Team</strong>
    </p>

  </div>`;
};

exports.sendOtp = async (email, otp, username = "unknown") => {
  brevo.transactionalEmails.sendTransacEmail({
    subject: "Verification code",
    to: [{ email: email }],
    sender: { name: "anonymous feedback", email: process.env.BREVO_EMAIL },
    htmlContent: otpEmailTemplate(username, otp),
  });
};
