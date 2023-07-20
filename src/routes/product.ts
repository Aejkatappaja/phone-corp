import Product from "../db/product";
import express, { Request, Response } from "express";
import { IProduct } from "types/types";

const router = express.Router();

router.post("/add-product", async (req: Request, res: Response) => {
  try {
    const { brand, model, sku, price, quantity }: IProduct = req.body;

    const newProduct = new Product({
      brand,
      model,
      sku,
      price,
      quantity,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
