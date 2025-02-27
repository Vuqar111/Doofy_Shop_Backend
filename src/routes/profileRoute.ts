// customerRoutes.ts
import express from "express";
import { getCustomerProfile} from "../controllers/customer/customerGetProfileController";
import {isCustomerAuth} from "../middleware/customerMiddleware";
import {changePassword} from "../controllers/customer/customerAuthController";
import {updateCustomerProfile} from "../controllers/customer/customerUpdateController";


const router = express.Router();

// router.get("/", isCustomerAuth, getCustomerProfile);
// router.put("/update", isCustomerAuth, updateCustomerProfile);
// router.put("/update/password", isCustomerAuth, changePassword);

export default router;
