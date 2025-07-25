// ordertRoutes.ts
import express from "express";
import { createOrder } from "../controllers/order/orderCreateController";
import {getAllCustomerOrders} from "../controllers/order/orderListController";
import { getCustomerOrderByID } from "../controllers/order/orderDetailsController";
import { isCustomerAuth } from "../middleware/customerMiddleware";

const router = express.Router();

router.post("/",isCustomerAuth, createOrder);  
router.get("/seed", isCustomerAuth, getAllCustomerOrders);
router.get("/seed/:id", isCustomerAuth, getCustomerOrderByID);
// router.put("/:id", isAuth, updateOrder);

export default router;
