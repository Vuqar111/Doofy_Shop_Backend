import nodemailer from "nodemailer";
import Notification from "../models/notification";
import { getEmailBody } from "../utils/parentPasswordTemplate";

const EMAIL_USERNAME = "dofi.robot@gmail.com";
const EMAIL_PASSWORD = "hudkgrntdovwxycl";
const SMTP_HOST = "smtp.gmail.com";
const SMTP_PORT = 465;

// Create transporter
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: true,
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
  },
});

/**
 * Sends an email and logs the notification.
 */
export const sendNotification = async (
  recipient: string,
  subject: string,
  text: string,
  emailTitle: string
): Promise<void> => {
  const email = {
    emailTitle,
    recipient,
    subject,
    text,
  };

  const mailOptions = {
    from: EMAIL_USERNAME,
    to: recipient,
    subject: subject,
    text: text,
    html: getEmailBody(email),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);

    await Notification.create({
      receipent: recipient,
      message: text,
      purpose: subject,
    });
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw new Error("Email failed to send. Try again later.");
  }
};
