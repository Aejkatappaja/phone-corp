import Product from "../models/product.model";
import { IProduct } from "types/product.type";

export const getAllProducts = (): Promise<IProduct[]> => Product.find();

export const getProductId = (id: string): Promise<IProduct> =>
  Product.findById(id);

export const getTotalProductsReferences = async (): Promise<number> => {
  const allProducts = await getAllProducts();
  return allProducts.length;
};

export const getTotalProductsValue = async (): Promise<number> => {
  const allProducts = await getAllProducts();
  return allProducts.reduce(
    (total: number, product: IProduct) => total + product.price,
    0
  );
};

export const getTotalProductsQuantity = async (): Promise<number> => {
  const allProducts = await getAllProducts();
  return allProducts.reduce(
    (total: number, product: IProduct) => total + product.quantity,
    0
  );
};

const productService = {
  getAllProducts,
  getProductId,
  getTotalProductsReferences,
  getTotalProductsValue,
  getTotalProductsQuantity,
};

export default productService;
