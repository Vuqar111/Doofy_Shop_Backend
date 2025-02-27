import { Response } from "express";
import Customer from "../../models/customer";
import { CustomerRequest } from "../../middleware/customerMiddleware";

export const getCustomerProfile = async (req: CustomerRequest, res: Response) => {
  try {
    const customerId = req.customer?._id;
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: " Internal server error" });
  }
};


