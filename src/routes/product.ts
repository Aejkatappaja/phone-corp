import {
  createProduct,
  getProductById,
  getProducts,
  handleMissingProductId,
} from "../controllers/product";
import express from "express";

const productRouter = express.Router();

productRouter.post("/product/create", createProduct);

productRouter.get("/product/stock", getProducts);

productRouter.get("/product/:id", getProductById);

productRouter.get("/product/", handleMissingProductId);

module.exports = productRouter;
