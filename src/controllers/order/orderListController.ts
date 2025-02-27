import {  Response } from "express";
import Order from "../../models/order";
import Customer from "../../models/customer";
import { IOrder } from "../../interfaces/order";
import { CustomerRequest } from "../../middleware/customerMiddleware";

// Get all customer orders
export const getAllCustomerOrders = async (
  req: CustomerRequest,
  res: Response
): Promise<void> => {
  try {
    // Extract search query parameters from request query
    const customerId = req.customer?._id;
    const customer = await Customer.findById(customerId);
    
    // if(!customer) {
    //     return res.status(404).json({ message: "Customer not found" });
    // }
    
    let products: IOrder[];
    let query: any = {};

    

    // Fetch products based on the constructed query
    products = await Order.find({}).sort({ createdAt: -1 })

    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

