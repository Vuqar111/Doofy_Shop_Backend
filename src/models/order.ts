// models/offer.ts
import mongoose, { Schema } from "mongoose";
import { IOrder,IOrderedProduct } from "../interfaces/order";

const ProductSchema = new Schema<IOrderedProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  code: {type: String, required: true},
  qty: { type: Number, required: true },
  image: { type: String, required: true },
  color: { type: String, required: true },
  totalPrice: { type: Number, required: false },
});

const OrderSchema = new Schema<IOrder>(
  {
    customerId: { type:  mongoose.Schema.Types.ObjectId, required: true },
    orderNumber: { type: String, required: true },
    subTotalCost: { type: Number, required: true },
    discount: { type: String, required: false },
    status: {
      type: String,
      required: true,
      enum: ["Created", "Pending", "Shipped", "Delivered", "Canceled"],
    },
    payment: {
      payment_status: {
        type: String,
        required: true,
        enum: ["Paid", "Unpaid", "Refunded"],
      },
      payment_type: {
        type: String,
        required: true,
        enum: ["Cash", "Cart"],
      },
    },
    delivery: {
      address: { type: String, required: true },
      city: { type: String, required: false },
      postal_code: { type: String, required: false },
      country: { type: String, required: false },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      full_name: { type: String, required: true },
      apartment: { type: String, required: false },
    },
    totalEstimate: { type: Number, required: true },
    products: [ProductSchema],
    notes: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model<IOrder>("Order", OrderSchema);

export default OrderModel;
