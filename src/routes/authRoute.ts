// customerRoutes.ts
import express from "express";
import { loginCustomer, registerCustomer,changePassword } from "../controllers/customer/customerAuthController";
import { getCustomerProfile} from "../controllers/customer/customerGetProfileController";
// import {isCustomerAuth} from "../middleware/customerMiddleware";
// import {updateCustomerProfile} from "../controllers/customer/customerWeb/customerUpdateController";
const router = express.Router();

router.post("/register", registerCustomer);
router.post("/login",loginCustomer);
// router.get("/profile", isCustomerAuth, getCustomerProfile);
// router.put("/profile-update", isCustomerAuth, updateCustomerProfile);
// router.put("/update-password", isCustomerAuth, changePassword);

export default router;
