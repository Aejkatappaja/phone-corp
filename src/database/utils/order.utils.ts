import { OrderData } from "../../types/order.data";
import orderService from "../services/order.service";

export const getOrderData = async (): Promise<OrderData> => {
  const orders = await orderService.getAllOrders();
  const ordersTotalNumber = await orderService.getNumberOfOrders();
  return {
    orders,
    "Total orders passed": ordersTotalNumber,
  };
};
