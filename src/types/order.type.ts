import { IProduct } from "./product.type";

export interface IOrder extends Document {
  order: IProduct[];
  date: Date;
  orderValue: number;
  productsQuantityOrdered: number;
}
