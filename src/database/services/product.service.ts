import Product from "../models/product.model"; // Assurez-vous d'avoir le bon chemin d'importation ici
import { IProduct } from "types/product.type";

export const getAllProducts = () => Product.find();

export const getProductId = (id: string) => Product.findById(id);

export const getTotalProductsReferences = async () => {
  const allProducts = await getAllProducts();
  return allProducts.length;
};

export const getTotalProductsValue = async () => {
  const allProducts = await getAllProducts();
  return allProducts.reduce(
    (total: number, product: IProduct) => total + product.price,
    0
  );
};

export const getTotalProductsQuantity = async () => {
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
