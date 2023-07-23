import {
  createProduct,
  getProductById,
  getProducts,
} from "../controllers/product";
import express from "express";

const productRouter = express.Router();

productRouter.post("/product/create", createProduct);

productRouter.get("/product/stock", getProducts);

productRouter.get("/product/:id", getProductById);

module.exports = productRouter;
