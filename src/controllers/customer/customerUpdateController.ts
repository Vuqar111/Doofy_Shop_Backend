import { Request, Response } from "express";
import Customer from "../../models/customer";
import { generateToken } from "../../middleware/customerMiddleware";


export const updateCustomerProfile = async (req: Request, res: Response) => {
  try {
    // Use type assertion to let TypeScript know that req.customerId exists
    const customerId = (req as any).customer?._id;

    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    customer.fullName = req.body.fullName || customer.fullName;
    customer.phoneNumber = req.body.phoneNumber || customer.phoneNumber;
    customer.email = req.body.email || customer.email;
    customer.address = req.body.address || customer.address;
    customer.company = req.body.company || customer.company;
    customer.customer_type = req.body.customer_type || customer.customer_type;

    // Save the updated customer
    await customer.save();
    res.status(200).send({ success: true, access_token: generateToken(customer) });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};