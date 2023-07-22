import http from "http";
import cors from "cors";
import morgan from "morgan";
import config from "./config/env.config";
import express, { Express, Request, Response } from "express";

const mongoose = require("./config/db.config");

const productRouter = require("./routes/product");

const app: Express = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ credentials: true }));

const server = http.createServer(app);

app.use(productRouter);

app.get("/", (res: Response) => {
  return res.send("Welcome to PhoneCorp API !");
});

server.listen(config.port, () => {
  console.log(
    `⚡️[server]: Server started 🚀 running at http://localhost:${config.port}`
  );
});
