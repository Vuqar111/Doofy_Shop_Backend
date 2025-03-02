import { Response } from "express";
import Order from "../../models/order";
import Customer from "../../models/customer";
import { CustomerRequest } from "../../middleware/customerMiddleware";

// Get all customer orders
export const getAllCustomerOrders = async (
  req: CustomerRequest,
  res: Response
): Promise<void> => {
  try {
    const customerId = req.customer?._id;

    // Find the customer by ID and get their email
    const customer = await Customer.findById(customerId);
    if (!customer) {
      res.status(404).json({ error: "Customer not found" });
      return;
    }

    const customerEmail = customer.email;

    // Find orders associated with the customer's email
    const orders = await Order.find({ customerId: customerEmail }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


