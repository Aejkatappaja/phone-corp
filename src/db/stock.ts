import mongoose, { Document, Model, Schema } from "mongoose";
import { IStock } from "types/types";

const stockSchema = new mongoose.Schema({
  products: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  totalQuantity: Number,
  totalPrice: Number,
  date: Date,
});

const Product: Model<IStock> = mongoose.model<IStock>("Stock", stockSchema);

export default Product;
