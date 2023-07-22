import { IOrder } from "types/order.type";
import mongoose, { Model, Schema } from "mongoose";

const orderSchema = new mongoose.Schema({
  products: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  employeeName: { type: String, required: true },
  // orderProductsQuantity: { type: Number, required: false },
  // totalOrderAmount: { type: Number, required: false },
  date: { type: Date, required: true },
});

const Order: Model<IOrder> = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
