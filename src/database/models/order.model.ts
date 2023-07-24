import mongoose, { Schema, Document } from "mongoose";
import { IOrder, IOrderItem } from "types/order.type";

const orderItemSchema = new Schema<IOrderItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, required: true },
});

const orderSchema = new Schema<IOrder>({
  order: [orderItemSchema],
  date: { type: Date, default: Date.now },
  orderValue: { type: Number, default: 0 },
  productsQuantityOrdered: { type: Number, default: 0 },
});

export default mongoose.model<IOrder>("Order", orderSchema);
