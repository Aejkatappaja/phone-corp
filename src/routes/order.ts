import { createOrder, getOrders } from "../controllers/order";
import express from "express";

const orderRouter = express.Router();

orderRouter.post("/order/create", createOrder);

orderRouter.get("/order/history", getOrders);

module.exports = orderRouter;
