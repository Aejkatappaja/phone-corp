import Order from "../../database/models/order.model";
import Product from "../../database/models/product.model";
import { Request, Response } from "express";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { employeeName, products } = req.body;
    if (!products || !employeeName) {
      return res.status(500).json({ message: "Something is missing" });
    }
    const productIds = products?.map(
      (product: { productId: string }) => product.productId
    );
    const existingProducts = await Product.findById(productIds);

    if (existingProducts?._id.toString() !== productIds.toString()) {
      return res.status(404).json({
        message: "Certains produits n'existent pas en base de données.",
      });
    }

    // let totalOrderAmount = 0;
    // products.forEach((product: { productId: string; quantity: number }) => {
    //   const existingProduct = existingProducts.find(
    //     (p) => p._id.toString() === product.productId
    //   );
    //   totalOrderAmount += existingProduct.price * product.quantity;
    // });

    // const orderProductsQuantity = products.reduce(
    //   (total: number, product: { quantity: number }) =>
    //     total + product.quantity,
    //   0
    // );

    const date = Date.now();

    const newOrder = new Order({
      employeeName,
      products,
      date,
    });

    await newOrder.save();

    await newOrder.populate("products.productId");

    return res.status(201).json({ newOrder });
  } catch (e: unknown) {
    console.error(e);
    res.status(500).send(e);
  }
};
