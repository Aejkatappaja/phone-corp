import { Types } from "mongoose";
import { IProduct } from "./product.type";

export interface IOrder extends Document {
  product: Types.Array<IProduct>;
  employeeName: string;
  orderProductQuantity: number;
  totalOrderAmount: number;
  date: Date;
}
