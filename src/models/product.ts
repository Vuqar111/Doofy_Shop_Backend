// product.model.ts
import mongoose, { Schema } from "mongoose";
import { IProduct } from "../interfaces/product";


const productSchema = new Schema(
  {
    code: {type: String, required: true},
    name: { type: String, required: true },
    image: { type: String, required: true },
    purchasePrice: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    region: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category"},
    note: { type: String, required: false },
    status: { type: Number, required: false },
    type: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProduct>("Product", productSchema);
