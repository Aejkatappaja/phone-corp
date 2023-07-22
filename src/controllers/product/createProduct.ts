import { Request, Response } from "express";
import { IProduct } from "../../types/product.type";
import Product from "../../database/models/product.model";

export const createProduct = async (req: Request, res: Response) => {
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
  } catch (e: unknown) {
    console.error(e);
    res.status(500).send(e);
  }
};
