import { Request, Response } from "express";
import { IProduct } from "../../types/product.type";
import { createNewProduct } from "../../database/services/product.service";

export const createProduct = async (
  req: Request,
  res: Response
): Promise<Response<IProduct, Record<string, any>>> => {
  try {
    const productInfos: IProduct = req.body;

    if (
      !productInfos.brand ||
      !productInfos.model ||
      !productInfos.sku ||
      !productInfos.price ||
      !productInfos.quantity
    ) {
      return res
        .status(400)
        .json({ message: "You need to provide all the required informations" });
    }

    const newProduct = await createNewProduct(productInfos);

    if (!newProduct) {
      return res
        .status(409)
        .json({ message: "Product with the same SKU already exists" });
    }

    return res.status(201).json(newProduct);
  } catch (error: any) {
    console.error(error);
    return res.status(500).send(error);
  }
};
