// models/offer.ts
import mongoose, { Schema } from "mongoose";
import { IOrder,IOrderedProduct, IDelivery, IPayment } from "../interfaces/order";

const ProductSchema = new Schema<IOrderedProduct>({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  code: {type: String, required: true},
  qty: { type: Number, required: true },
  color: { type: String, required: true },
  totalPrice: { type: Number, required: false },
});

const OrderSchema = new Schema<IOrder>(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, required: true },
    orderNumber: { type: String, required: true },
    subTotalCost: { type: Number, required: true },
    discount: { type: Number, required: true },
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
      city: { type: String, required: true },
      postalCode: { type: String, required: false },
      country: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
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
