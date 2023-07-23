import { createOrder } from "../controllers/order/createOrder";
import express from "express";

const orderRouter = express.Router();

orderRouter.post("/order/create", createOrder);

// orderRouter.get("/orders", getAllOrders);

module.exports = orderRouter;
