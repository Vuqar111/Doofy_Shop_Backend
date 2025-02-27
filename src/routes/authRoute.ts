// authRoutes.ts
import express, { RequestHandler } from "express";
import { forgotPasswordCustomer, loginCustomer, registerCustomer, resetPasswordCustomer } from "../controllers/customer/customerAuthController";
const router = express.Router();

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);
router.put("/forgot-password", forgotPasswordCustomer as RequestHandler);
router.put("/reset-password", resetPasswordCustomer as RequestHandler)

export default router;
