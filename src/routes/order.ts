import express from "express";
import { createOrder, getOrders } from "../controllers/order";

const orderRouter = express.Router();

orderRouter.post("/order/create", createOrder);

orderRouter.get("/order/history", getOrders);

module.exports = orderRouter;
