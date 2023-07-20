import Product from "../db/product";
import express, { Request, Response } from "express";
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
    res.status(200).json({ Products });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get("/product/:sku", async (req: Request, res: Response) => {
  try {
    const sku = req.params.sku;
    const product: IProduct = await Product.findOne({ sku }).exec();
    res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
