import {
  createProduct,
  getProductById,
  getProducts,
} from "../controllers/product";
import express from "express";

const productRouter = express.Router();

productRouter.get("/create-product", createProduct);

productRouter.get("/products", getProducts);

productRouter.get("/product/:id", getProductById);

module.exports = productRouter;
