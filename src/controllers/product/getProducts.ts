import { Request, Response } from "express";

import { getProductData } from "../../database/utils/product.utils";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const productData = await getProductData();

    return res.status(200).json(productData);
  } catch (e: unknown) {
    console.error(e);
    return res.status(500).send(e);
  }
};
