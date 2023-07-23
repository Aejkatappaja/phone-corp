import { Types } from "mongoose";
import Order from "../../database/models/order.model";
import Product from "../../database/models/product.model";
import { Request, Response } from "express";
import { IOrder } from "../../types/order.type";

export const createOrder = async (
  req: Request,
  res: Response
): Promise<Response<IOrder, Record<string, any>>> => {
  try {
    const { order } = req.body;
    if (!order || !Array.isArray(order) || order.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const productIdsWithQuantities = order.map(
      (product: { productId: string; quantity: number }) => ({
        productId: new Types.ObjectId(product.productId),
        quantity: product.quantity,
      })
    );

    const productIds = productIdsWithQuantities.map((item) => item.productId);

    const existingProducts = await Product.find({ _id: { $in: productIds } });

    const foundProductIds = existingProducts.map((product) =>
      product._id.toString()
    );
    const notFoundProductIds = productIds.filter(
      (productId) => !foundProductIds.includes(productId.toString())
    );

    const orderItems = productIdsWithQuantities.map((item) => {
      const existingProduct = existingProducts.find((product) =>
        product._id.equals(item.productId)
      );
      if (existingProduct) {
        const existingQuantity = existingProduct.quantity || 0;
        const updatedQuantity = existingQuantity + item.quantity;
        existingProduct.quantity = updatedQuantity;

        return {
          product: existingProduct._id,
          quantity: item.quantity,
        };
      }

      return null;
    });

    let totalOrderValue = 0;
    let totalOrderProductQuantity = 0;

    orderItems.forEach((item) => {
      if (item !== null) {
        const existingProduct = existingProducts.find((product) =>
          product._id.equals(item.product)
        );
        if (existingProduct) {
          totalOrderValue += existingProduct.price * item.quantity;
          totalOrderProductQuantity += item.quantity;
        }
      }
    });

    const newOrder = new Order({
      order: orderItems.filter((item) => item !== null),
      orderValue: totalOrderValue,
      productsQuantityOrdered: totalOrderProductQuantity,
    });

    await newOrder.save();

    let informationMessage = "";
    if (notFoundProductIds.length > 0) {
      informationMessage = `Some products not found in the database and cannot be ordered: ${notFoundProductIds.join(
        ", "
      )}`;
      console.log(informationMessage);
    }

    await Promise.all(existingProducts.map((product) => product.save()));

    await Order.populate(newOrder, {
      path: "order.product",
      select: "brand model price",
    });

    const orderDataWithDateAndQuantities = {
      ...newOrder.toObject(),
      date: newOrder.date,
      order: orderItems
        .map((item) => {
          if (item !== null) {
            return {
              productId: item.product.toString(),
              quantity_ordered: item.quantity,
            };
          }
        })
        .filter((item) => item !== undefined),
      orderValue: totalOrderValue,
      productsQuantityOrdered: totalOrderProductQuantity,
    };

    return res
      .status(201)
      .json({ order: orderDataWithDateAndQuantities, informationMessage });
  } catch (error: any) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
