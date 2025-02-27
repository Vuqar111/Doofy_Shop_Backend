// notification.model.ts
import mongoose, { Schema } from "mongoose";
import { INotification } from "../interfaces/notification";

const notificationSchema = new Schema({
  receipent: { type: String, required: true },
  message: { type: String, required: true },
  purpose: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<INotification>("Notification", notificationSchema);
