import { Types } from "mongoose";
import Order from "../../database/models/order.model";
import Product from "../../database/models/product.model";
import { Request, Response } from "express";
import { getProductIdData } from "database/utils/product.utils";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { employeeName, products } = req.body;
    if (!products || !employeeName) {
      return res.status(500).json({ message: "Something is missing" });
    }
    const productIds = products?.map(
      (product: { productId: string }) => new Types.ObjectId(product.productId)
    );

    const existingProducts = await Product.find({ _id: { $in: productIds } });

    // iteration on id array, call getProductIdData and check product for each iteration
    console.log(existingProducts);

    if (existingProducts.length !== productIds.length) {
      return res.status(404).json({
        message: "Certains produits n'existent pas en base de données.",
      });
    }

    const totalOrderAmount = products.reduce(
      (total: number, product: { productId: string; quantity: number }) => {
        const existingProduct = existingProducts.find(
          (p) => p._id.toString() === product.productId
        );
        return total + existingProduct.price * product.quantity;
      },
      0
    );

    const orderProductsQuantity = products.reduce(
      (total: number, product: { quantity: number }) =>
        total + product.quantity,
      0
    );

    const newOrder = new Order({
      employeeName,
      product: existingProducts,
      totalOrderAmount,
      orderProductsQuantity,
    });

    await newOrder.save();

    return res.status(201).json({ newOrder });
  } catch (e: unknown) {
    console.error(e);
    res.status(500).send(e);
  }
};
