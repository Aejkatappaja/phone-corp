import Order from "../models/order.model";
import { IOrder } from "../../types/order.type";

export const getAllOrders = async (): Promise<IOrder[]> =>
  await Order.find()
    .populate({ path: "order.product", select: "brand model" })
    .sort({ date: -1 })
    .lean();

export const getNumberOfOrders = async (): Promise<number> => {
  const allOrders = await getAllOrders();
  return allOrders.length;
};

// export const productIdsWithQuantities = async (order: IOrder[]) => {
//   if (!order || !Array.isArray(order)) return [];

//   const productsWithQuantities = [];

//   for (const item of order) {
//     for (const product of item.order) {
//       const existingProduct: any | null = await Product.find({
//         _id: { $in: product },
//       });

//       if (existingProduct) {
//         const productWithQuantity = {
//           productId: existingProduct._id,
//           quantity: product.quantity,
//         };
//         productsWithQuantities.push(productWithQuantity);
//       }
//     }
//   }

//   return productsWithQuantities;
// };

const orderService = {
  getAllOrders,
  getNumberOfOrders,
};

export default orderService;
