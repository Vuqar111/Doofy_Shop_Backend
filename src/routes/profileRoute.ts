// customerRoutes.ts
import express, { RequestHandler } from "express";
import {getCustomerProfile} from "../controllers/customer/customerGetProfileController";
import {isCustomerAuth} from "../middleware/customerMiddleware";
import {changePassword} from "../controllers/customer/customerAuthController";
import {updateCustomerProfile} from "../controllers/customer/customerUpdateController";


const router = express.Router();

router.get("/", isCustomerAuth as RequestHandler, getCustomerProfile as RequestHandler);
router.get("/", isCustomerAuth as RequestHandler, updateCustomerProfile as RequestHandler);

// router.put("/update/password", isCustomerAuth, changePassword);

export default router;