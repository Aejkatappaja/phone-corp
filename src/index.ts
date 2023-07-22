import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";
const morgan = require("morgan");

dotenv.config({ path: "./.env" });

const mongoURL = process.env.MONGODB_URL;

const productRouter = require("./routes/api/product");

const app: Express = express();
app.use(express.json());
app.use(morgan("dev"));

app.use(cors({ credentials: true }));

app.use(productRouter);

const server = http.createServer(app);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to PhoneCorp API!");
});

server.listen(config.port, () => {
  console.log(
    `⚡️[server]: Server started 🚀 running at http://localhost:${config.port}`
  );
});

mongoose.Promise = Promise;
mongoose.connect(mongoURL);
mongoose.connection.on("error", (error: Error) => console.log(error));
