import { Request, Response } from "express";
import Product from "../../models/product";
import { IProduct } from "../../interfaces/product";


// Get a single product by ID
export const getProductBySlug = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product: IProduct | null = await Product.findOne({
      slug: req.params.slug,
    });

    res.status(200).json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
