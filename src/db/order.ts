import mongoose, { Document, Model, Schema } from "mongoose";
import { IOrder } from "types/types";

const orderSchema = new mongoose.Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  productQuantity: Number,
  totalPrice: Number,
  date: Date,
});

const Product: Model<IOrder> = mongoose.model<IOrder>("Order", orderSchema);

export default Product;
