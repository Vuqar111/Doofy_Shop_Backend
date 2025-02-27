import { CustomerRequest } from "../../middleware/customerMiddleware";
import { Response } from "express";
import Order from "../../models/order";
import { IOrder } from "../../interfaces/order";


// Get a single product by ID
export const getCustomerOrderByID = async (
  req: CustomerRequest,
  res: Response
): Promise<void> => {
  try {   
    const order: IOrder | null = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
