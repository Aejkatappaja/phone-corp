import { createNewProduct } from "../../database/services/product.service";
import { Request, Response } from "express";
import { IProduct } from "../../types/product.type";

export const createProduct = async (
  req: Request,
  res: Response
): Promise<Response<IProduct, Record<string, any>>> => {
  try {
    const productInfos: IProduct = req.body;

    if (Object.keys(productInfos).length < 4) {
      return res
        .status(400)
        .json({ message: "You need to provide all the required informations" });
    }

    const newProduct = await createNewProduct(productInfos);

    if (!newProduct) {
      return res
        .status(409)
        .json({ message: "Product with the same sku already exists" });
    }

    return res.status(201).json(newProduct);
  } catch (error: any) {
    console.error(error);
    return res.status(500).send(error);
  }
};
