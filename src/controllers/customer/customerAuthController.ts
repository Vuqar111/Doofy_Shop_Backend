// customerAuthController.ts
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import Customer from "../../models/customer";
import { sendNotification } from "../../middleware/notificationMiddleware";
import { CustomerRequest, generateToken } from "../../middleware/customerMiddleware";
// Register a new customer
export const registerCustomer = async (req: Request, res: Response) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newParent = new Customer({
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      password: hashedPassword,
    });
    await newParent.save();
    res.status(201).json({
      token: generateToken(newParent),
      expiresIn: 3600000,
      success: true,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { password, email } = req.body;
    const user = await Customer.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "Invalid phone number or password" });
      return; // Ensure the function ends here
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid email or password" });
      return; // Ensure the function ends here
    }

    res.status(200).send({
      token: generateToken(user),
      expiresIn: 3600000,
      success: true,
    });
  } catch (error) {
    next(error); 
  }
};


export const forgotPasswordCustomer = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await Customer.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpire = Date.now() + 3600000; // 1 hour from now

    // Ensure Mongoose tracks the changes
    user.set("resetPasswordToken", resetToken);
    user.set("resetPasswordExpires", resetTokenExpire);
    await user.save();
    // Create password reset link
    const resetLink = `https://doofy-website.vercel.app/auth/reset-password?token=${resetToken}`;

    // Send email with the reset link
    const recipient = email;
    const subject = "Password Reset Request";
    const text = `Click the link below to reset your password:\n\n${resetLink}`;
    const emailTitle = "Password Reset";
    sendNotification(recipient, subject, text, emailTitle)(req, res, () => {});

    res.status(200).json({
      message: "Password reset link sent. Check your email.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const resetPasswordCustomer = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    const user = await Customer.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Ensure token is still valid
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash new password
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = "";
    user.resetPasswordExpires = 0;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const changePassword = async (req: CustomerRequest, res: Response) => {
    try {
      const { current_password, new_password } = req.body;
      // Find user by userId
      const customerId = (req as any).customer?._id;
      const customer = await Customer.findById(customerId);
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }
  
      // Verify current password
      const isPasswordValid = await bcrypt.compare(current_password, customer.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }
      const hashedPassword = await bcrypt.hash(new_password, 10);
  
      // Update user's password in the database
      customer.password = hashedPassword;
      await customer.save();
  
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }