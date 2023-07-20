import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config({ path: "./.env" });
const port = process.env.PORT;
const mongoURL = process.env.MONGODB_URL;

const product = require("./routes/product");
const app: Express = express();
app.use(express.json());

app.use(cors({ credentials: true }));
app.use(product);

const server = http.createServer(app);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to PhoneCorp API!");
});

server.listen(4000, () => {
  console.log(
    `⚡️[server]: Server started 🚀 running at http://localhost:${port}`
  );
});

mongoose.Promise = Promise;
mongoose.connect(mongoURL);
mongoose.connection.on("error", (error: Error) => console.log(error));
