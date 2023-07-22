import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const mongoose = require("mongoose");
const mongoURL = process.env.MONGODB_URL;

mongoose.Promise = Promise;
mongoose.connect(mongoURL);
mongoose.connection.on("error", (error: unknown) => console.log(error));

module.exports = mongoose;
