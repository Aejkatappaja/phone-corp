import { IProduct } from "types/product.type";
import { ProductData } from "types/product.data.type";
import productService from "../services/product.service";

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

export const getProductIdData = async (id: string): Promise<IProduct> => {
  const productFoundById: IProduct = await productService.getProductId(id);
  return productFoundById;
};
