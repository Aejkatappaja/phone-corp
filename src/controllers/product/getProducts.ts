import { getProductData } from "../../database/utils/product.utils";
import { ProductData } from "types/product.data.type";
import { Response, Request } from "express";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<Response<ProductData, Record<string, any>>> => {
  try {
    const productData = await getProductData();
    return res.status(200).json(productData);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
