import { db } from "./dbMango.js";
import express from "express";
import "dotenv/config";

import { errorHandler } from "./errorHandler.js";
import productsRouter from "./routes.js";

const app = express();
app.use(express.json());
app.use("/products", productsRouter);

app.use(errorHandler);
app.listen(process.env.PORT, () =>
  console.log("welcome to products server port :", process.env.PORT),
);
