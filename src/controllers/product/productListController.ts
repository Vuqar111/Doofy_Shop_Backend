import { Request, Response } from "express";
import Product from "../../models/product";
import { IProduct } from "../../interfaces/product";
// Get all products
export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Extract search query parameters from request query
    const { name, category, createdAt } = req.query;
    let products: IProduct[];
    let query: any = {};

    // If name search query parameter is present, add to the query
    if (name) {
      query.$or = [{ name: { $regex: new RegExp(name as string, "i") } }];
    }

    // If category search query parameter is present, add to the query
    if (category) {
      query.category = category;
    }

    if (createdAt) {
      const parsedDate = new Date(`${createdAt as string}T00:00:00.000Z`);
      query.createdAt = { $gte: parsedDate };
    }

    // Fetch products based on the constructed query
    products = await Product.find(query).sort({ createdAt: -1 })

    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

