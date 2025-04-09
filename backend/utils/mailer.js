const nodemailer = require("nodemailer");

const sendMail = async (to, subject, html) => {
  try {
    // Transporter setup (using Gmail for example)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER, // Gmail ID
        pass: process.env.MAIL_PASS, // App password
      },
    });

    const mailOptions = {
      from: `"OTP Auth" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
    return true;
  } catch (err) {
    console.error("Mail sending error:", err);
    return false;
  }
};

module.exports = sendMail;
