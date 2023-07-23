import Order from "../models/order.model";
import { IOrder } from "../../types/order.type";
import { IProduct } from "../../types/product.type";

export const getAllOrders = async (): Promise<IOrder[]> =>
  await Order.find()
    .populate({ path: "order.product", select: "brand model" })
    .sort({ date: -1 })
    .lean();

export const getNumberOfOrders = async (): Promise<number> => {
  const allOrders = await getAllOrders();
  return allOrders.length;
};

const orderService = {
  getAllOrders,
  getNumberOfOrders,
};

export default orderService;
