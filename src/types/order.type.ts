import { IProduct } from "./product.type";

export interface IOrder extends Document {
  order: IOrderItem[];
  date: Date;
  orderValue: number;
  productsQuantityOrdered: number;
}

export interface IOrderItem extends Document {
  product: IProduct;
  quantity: number;
}
