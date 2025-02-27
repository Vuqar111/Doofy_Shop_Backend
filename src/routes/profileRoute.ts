// profileRoutes.ts
import express, { RequestHandler } from "express";
import {getCustomerProfile} from "../controllers/customer/customerGetProfileController";
import {isCustomerAuth} from "../middleware/customerMiddleware";
import {updateCustomerProfile} from "../controllers/customer/customerUpdateController";
import { changePassword } from "../controllers/customer/customerAuthController";


const router = express.Router();

router.get("/", isCustomerAuth as RequestHandler, getCustomerProfile as RequestHandler);
router.get("/", isCustomerAuth as RequestHandler, updateCustomerProfile as RequestHandler);
router.put("/change-password", changePassword as RequestHandler);

export default router;