import { IProduct } from "types/product.type";
import productService from "../services/product.service"; // Assurez-vous d'avoir le bon chemin d'importation ici

export const getProductData = async () => {
  const products = await productService.getAllProducts();
  const productsTotalQuantity = await productService.getTotalProductsQuantity();
  const productsTotalReferences =
    await productService.getTotalProductsReferences();
  const stockValue = await productService.getTotalProductsValue();

  return {
    "Products Stock": products,
    "Total Products Quantity": productsTotalQuantity,
    "Total Products References": productsTotalReferences,
    "Total Stock Value": stockValue,
  };
};

export const getProductIdData = async (id: string) => {
  const productFoundById: IProduct = await productService.getProductId(id);
  return productFoundById;
};
