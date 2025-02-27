import { Document } from "mongoose";


export interface ICustomer extends Document {
  fullName: string;
  email: string;
  company: string;
  address: string;
  phoneNumber: string;
  password: string;
  customer_type:string
}

