import mongoose, { Model } from "mongoose";
import { IProduct } from "types/product.type";

const productSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  sku: { type: Number, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  // stock
});

const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  productSchema
);

export default Product;
