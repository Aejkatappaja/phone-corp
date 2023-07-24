import { ObjectId } from "mongoose";

export interface IProduct extends Document {
  brand: string;
  model: string;
  sku: number;
  price: number;
  quantity: number;
}
