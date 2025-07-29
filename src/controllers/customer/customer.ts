export const forgotPasswordCustomer = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // Find the customer by email
    const user = await Customer.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a secure token (expires in 1 hour)
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpire = Date.now() + 3600000; // 1 hour from now

    // Update the user's reset password fields in the database
    await Customer.updateOne(
      { email },
      {
        $set: {
          resetPasswordToken: resetToken,
          resetPasswordExpires: resetTokenExpire,
        },
      }
    );

    // Create password reset link
    const resetLink = https://www.hellodofi.store/az/auth/reset-password?token=${resetToken};

    // Send email with the reset link
    const recipient = email;
    const subject = "Password Reset Request";
    const text = Click the link below to reset your password:\n\n${resetLink};
    const emailTitle = "Password Reset";
    sendNotification(recipient, subject, text, emailTitle)(req, res, () => { });

    res.status(200).json({
      message: "Password reset link sent. Check your email.",
      success: true,
    });
  } catch (error) {
    console.error("Error in forgotPasswordCustomer:", error);
    res.status(500).json({ message: error });
  }
};