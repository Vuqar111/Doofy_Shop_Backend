// category.model.ts
import mongoose, { Schema } from "mongoose";
import { ICategory } from "../interfaces/category";

const categorySchema = new Schema(
  {
    title: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ICategory>("Category", categorySchema);
