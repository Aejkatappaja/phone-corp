import { IProduct } from "types/product.type";

import { Request, Response } from "express";
import { getProductIdData } from "../../database/utils/product.utils";

export const getProductById = async (req: Request, res: Response) => {
  const productId = req.params.id;
  try {
    const product: IProduct = await getProductIdData(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    } else {
      return res.status(200).json({ product });
    }
  } catch (e: unknown) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
