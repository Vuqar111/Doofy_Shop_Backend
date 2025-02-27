import { Request, Response, NextFunction } from "express";
import nodemailer from "nodemailer";
import Notification from "../models/notification";
import { getEmailBody } from "../utils/parentPasswordTemplate";
// Email configuration
const EMAIL_USERNAME = "c8657545@gmail.com";
const EMAIL_PASSWORD = "bcozssymjajpqicg";
const SMTP_HOST = "smtp.gmail.com";
const SMTP_PORT = 465;

// Create transporter
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
  },
});

// Middleware to send email notifications
export const sendNotification: (
  recipient: string | undefined,
  subject: string,
  text: string,
  emailTitle: string
) => (req: Request, res: Response, next: NextFunction) => void = (
  recipient,
  subject,
  text,
  emailTitle
) => {
  return (req, res, next) => {
    const email = {
      emailTitle,
      recipient,
      subject,
      text,
    };
    // Compose email content
    const mailOptions = {
      from: EMAIL_USERNAME,
      to: recipient,
      subject: subject,
      text: text,
      html: getEmailBody(email),
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error occurred while sending email:", error.message);
      } else {
        Notification.create({
          receipent: recipient,
          message: text,
          purpose: subject,
        });
      }
    });

    // Continue with the request chain
    next();
  };
};
