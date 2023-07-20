import mongoose, { Document, Model, Schema } from "mongoose";
import { IProduct } from "types/types";

const productSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  sku: { type: Number, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  productSchema
);

export default Product;
