// productRoutes.ts
import express from "express";
import {
  getAllProducts,
} from "../controllers/product/productListController"
import {
  getProductBySlug,
} from "../controllers/product/productDetailsController";

const router = express.Router();


router.get("/",  getAllProducts);

router.get("/:slug",  getProductBySlug);

export default router;
