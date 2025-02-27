// product.interface.ts
import { Document } from 'mongoose';
import { ICategory } from "./category";
export interface IProduct extends Document {
  code: string;
  name: string;
  image: string;
  description: string;
  purchasePrice: number;
  salePrice: number;
  region: string;
  category: ICategory["_id"];
  note: string;
  status: number;
  type: number;
}