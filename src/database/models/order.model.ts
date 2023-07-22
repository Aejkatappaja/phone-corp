import { IOrder } from "types/order.type";
import mongoose, { Model, Schema } from "mongoose";

const orderSchema = new mongoose.Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  productQuantity: Number,
  total: Number,
  date: Date,
});

const Product: Model<IOrder> = mongoose.model<IOrder>("Order", orderSchema);

export default Product;
