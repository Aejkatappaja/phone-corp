import { createOrder } from "../controllers/order/createOrder";
import express from "express";

const orderRouter = express.Router();

orderRouter.use("/create-order", createOrder);

module.exports = orderRouter;
