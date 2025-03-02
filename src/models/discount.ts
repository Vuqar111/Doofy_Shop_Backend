// discount.model.ts
import mongoose, { Schema } from "mongoose";
import { IDiscount } from "../interfaces/discount";

const discountSchema = new Schema(
  {
    code: { type: String, required: true },
    type: { type: String, required: false, default: "percentage" },
    value: { type: Number, required: true },
    startDate: { type: String, required: true },
    expiryDate: { type: String, required: true },
    usedCount: { type: Number, required: true, default: 0 },
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IDiscount>("Discount", discountSchema);
