// customer.model.ts
import mongoose, { Schema } from "mongoose";
import { ICustomer } from "../interfaces/customer";

const customerSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    company: { type: String, required: false },
    password: { type: String, required: false },
    customer_type: {
      type: String,
      required: false,
      enum: ["Individual", "Business", "VIP"],
    },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICustomer>("Customer", customerSchema);
