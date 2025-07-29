// ordertRoutes.ts
import express, { RequestHandler } from "express";
import { createOrder } from "../controllers/order/orderCreateController";
import {getAllCustomerOrders} from "../controllers/order/orderListController";
import { getCustomerOrderByID } from "../controllers/order/orderDetailsController";
import { isCustomerAuth } from "../middleware/customerMiddleware";
import { createCheckout } from "../controllers/checkoutController";

const router = express.Router();

router.post("/", createCheckout as RequestHandler)
router.get("/seed", isCustomerAuth, getAllCustomerOrders);
router.get("/seed/:id", isCustomerAuth, getCustomerOrderByID);
// router.put("/:id", isAuth, updateOrder);
export default router;
