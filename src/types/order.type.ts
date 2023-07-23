import { IProduct } from "./product.type";

export interface IOrder extends Document {
  order: IProduct[];
  customerId: number;
  orderProductQuantity: number;
  totalOrderAmount: number;
  date: Date;
}
