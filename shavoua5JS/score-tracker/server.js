import express from "express";
import { db } from "./db/mongo.js";
import "dotenv/config";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Score tracker api",
    database: "connected",
  });
});

app.listen(process.env.PORT, () =>
  console.log("Welcome to score-tracker project , port : ", process.env.PORT),
);
