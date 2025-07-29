import mongoose, { Document } from "mongoose";

export interface IOrderedProduct extends Document {
    code: string;
    name: string;
    price: number;
    qty: number;
    color: string;
    image: string;
    totalPrice: number;
  }
  

export interface IPayment extends Document {
  paymentType: string;
  paymentStatus: string;
}

export interface IDelivery extends Document {
  address: string;
  city: string;
  postal_code: string;
  country: string;
  phone: string;
  email: string;
  full_name: string;
  apartment: string;
}



// Define Order Schema
export interface IOrder extends Document {
  customerId: string;
  orderNumber: string;
  delivery: IDelivery;
  payment: IPayment;
  subTotalCost: number;
  discount: string;
  status: string;
  totalEstimate: number;
  products: IOrderedProduct[];
  notes: string;
}
