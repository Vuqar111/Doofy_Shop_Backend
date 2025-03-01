import mongoose, { Document } from "mongoose";

export interface IOrderedProduct extends Document {
    productId: mongoose.Types.ObjectId;
    code: string;
    name: string;
    price: number;
    qty: number;
    color: string;
    totalPrice: number;
  }
  

export interface IPayment extends Document {
  paymentType: string;
  paymentStatus: string;
}

export interface IDelivery extends Document {
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  first_name: string;
  last_name: string;
  apartment: string;
}



// Define Order Schema
export interface IOrder extends Document {
  customerId: string;
  orderNumber: string;
  delivery: IDelivery;
  payment: IPayment;
  subTotalCost: number;
  discount: number;
  status: string;
  totalEstimate: number;
  products: IOrderedProduct[];
  notes: string;
}
