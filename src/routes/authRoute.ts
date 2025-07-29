// authRoutes.ts
import express, { RequestHandler } from "express";
import { forgotPasswordCustomer, loginCustomer, registerCustomer, resetPasswordCustomer } from "../controllers/customer/customerAuthController";
const router = express.Router();

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);
router.post(
  "/forgot-password",
  forgotPasswordCustomer as unknown as RequestHandler
);router.post("/reset-password", resetPasswordCustomer as RequestHandler)

export default router;
