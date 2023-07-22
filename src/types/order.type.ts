import { Types } from "mongoose";
import { IProduct } from "./product.type";

export interface IOrder extends Document {
  product: Types.Array<IProduct>;
  productsQuantity: number;
  totalPrice: number;
  date: Date;
}
