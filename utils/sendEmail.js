const nodemailer = require("nodemailer");

const sendFlagNotificationEmail = async (toEmail, product, review) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: toEmail,
    subject: "Review Flagged Notification",
    text: `Hello,

Your review for the product "${product.name}" has been flagged by our moderation system.
Comment: "${review.comment}"
Rating: ${review.rating}

If you believe this is an error, please contact our support team.

Thank you,
The Team`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Notification email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

module.exports = { sendFlagNotificationEmail };
