import { Response, Request } from "express";
import { OrderData } from "../../types/order.data";
import { getOrderData } from "../../database/utils/order.utils";

export const getOrders = async (
  req: Request,
  res: Response
): Promise<Response<OrderData, Record<string, any>>> => {
  try {
    const orderData = await getOrderData();
    return res.status(200).json(orderData);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
