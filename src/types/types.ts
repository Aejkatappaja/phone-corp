import { Types } from "mongoose";

export interface IProduct extends Document {
  brand: string;
  model: string;
  sku: number;
  price: number;
  quantity: number;
}

export interface IOrder extends Document {
  product: Types.Array<IProduct>;
  productsQuantity: number;
  totalPrice: number;
  date: Date;
}

export interface IStock extends Document {
  products: Types.Array<IProduct>;
  quantity: number;
  value: number;
}
