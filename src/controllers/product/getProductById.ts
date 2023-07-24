import { IProduct } from "types/product.type";
import { Request, Response } from "express";
import { getProductIdData } from "../../database/utils/product.utils";

export const getProductById = async (
  req: Request,
  res: Response
): Promise<Response<IProduct, Record<string, any>>> => {
  const productId = req.params.id;
  try {
    const product: IProduct = await getProductIdData(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    } else {
      return res.status(200).send({ product });
    }
  } catch (error: any) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const handleMissingProductId = (req: Request, res: Response) => {
  return res.status(400).json({ message: "You need to provide an ID" });
};
