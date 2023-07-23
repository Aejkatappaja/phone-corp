import { IOrder } from "types/order.type";
import mongoose, { Model, Schema } from "mongoose";

export interface IOrderModel extends Model<IOrder> {}

const orderSchema = new Schema<IOrder, IOrderModel>({
  order: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  date: { type: Date, required: true, default: Date.now() },
  orderValue: { type: Number, required: true },
  productsQuantityOrdered: { type: Number, required: true },
});

const Order: IOrderModel = mongoose.model<IOrder, IOrderModel>(
  "Order",
  orderSchema
);

export default Order;
