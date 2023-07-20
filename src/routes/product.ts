import Product from "../db/product";
import express, { NextFunction, Request, Response } from "express";
import { IProduct } from "types/types";

const router = express.Router();

//===========================================================================================================================//
//==========================================================================================================================//
//                                     ROUTE CREATED TO INIT MONGODB PRODUCT LIST                                          //
//========================================================================================================================//
//=======================================================================================================================//

// router.post("/add-product", async (req: Request, res: Response) => {
//   try {
//     const { brand, model, sku, price, quantity }: IProduct = req.body;

//     const newProduct = new Product({
//       brand,
//       model,
//       sku,
//       price,
//       quantity,
//     });

//     await newProduct.save();
//     res.status(201).json(newProduct);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error);
//   }
// });

router.get("/products", async (req: Request, res: Response) => {
  try {
    const Products = await Product.find();
    res.status(200).json({ "Products Stock": Products });
  } catch (e: unknown) {
    console.error(e);
    res.status(500).send(e);
  }
});

router.get("/product/:id", async (req: Request, res: Response) => {
  const productId = req.params.id;

  try {
    const product: IProduct = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.status(200).json({ product });
    }
  } catch (e: unknown) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
