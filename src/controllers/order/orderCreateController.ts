import { Response } from "express";
import Order from "../../models/order";
import { IOrder } from "../../interfaces/order";
import { v4 as uuidv4 } from "uuid";
import { CustomerRequest } from "../../middleware/customerMiddleware";
let orderCounter = 0;

interface IProductModel {
  name:string;
  productId: string;
  price: string;
  qty: string;
  code:string;
  totalPrice?: number;
}

export const createOrder = async (req: CustomerRequest, res: Response) => {
  try {
    const {
      payment,
      products,
      delivery,
      discount,
      notes
    } = req.body;
    // Calculate subtotal cost
    const subTotalCost = products.reduce(
      (acc: number, product: any) =>
        acc + product.price * product.qty,
      0
    );

    // Calculate final cost
    const finalCost = products.reduce(
      (acc: number, product: any) =>
        acc +
        product.price * product.qty * (1 - (discount ? discount : 0) / 100),
      0 // Initial value for reduce
    );
    

    // Calculate total estimate


    const roundToDecimalPlaces = (number: number, decimalPlaces: number) => {
      const factor = Math.pow(10, decimalPlaces);
      return Math.round(number * factor) / factor;
    };

    const productsWithTotalPrice: IProductModel[] = products.map((product: IProductModel) => {
      // Convert strings to numbers
      const price = parseFloat(product.price);
      const qty = parseFloat(product.qty);
    
      // Calculate total price
      const totalPrice = price * qty;
    
      return {
        ...product,
        totalPrice: roundToDecimalPlaces(totalPrice, 2) // Round to 2 decimal places
      };
    });

    // Create new order instance
    const orderNumberPrefix = `ORDER-${uuidv4()
      .slice(0, 6)
      .replace(/\D/g, "")}`;
    const orderNumberSuffix = orderCounter === 0 ? "1" : `${orderCounter + 1}`;
    const orderNumber = `${orderNumberPrefix}.${orderNumberSuffix}`;




    // Find the user
    const newOrder: IOrder = new Order({
      customerId: req.body.email,
      products: productsWithTotalPrice,
      status: "Created",
      orderNumber,
      subTotalCost,
      payment,
      delivery,
      discount,
      totalEstimate: finalCost,
      notes
    });

    
    // Save the new order
    if (products?.length === 0) {
      res.status(500).json({ error: "Internal Server Error" });
    }
    const savedOrder: IOrder = await newOrder.save();
 
    res.status(201).json({ success: true, savedOrder });
  } catch (error: any) {
    console.error("Error creating order:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
