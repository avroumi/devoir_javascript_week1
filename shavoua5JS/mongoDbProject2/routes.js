import { Router } from "express";
import { db } from "./dbMango.js";
import { AppError } from "./AppError.js";
import { ObjectId } from "mongodb";

const products = db.collection("products");
const router = Router();

router.post("/", async (req, res) => {
  const { name, category, price, stock, active } = req.body;
  if (!name || typeof name !== "string") {
    throw new AppError("Name must be not empty string", 400);
  }
  const validCategory = ["food", "tech", "clothing", "other"];
  if (
    !category ||
    typeof category !== "string" ||
    !validCategory.includes(category.toLowerCase())
  ) {
    throw new AppError(
      `Invalid category , must be string and in ${validCategory}`,
      400,
    );
  }

  const numPrice = Number(price);
  if (!Number.isInteger(numPrice) || numPrice < 0) {
    throw new AppError("Price must be a positive integer", 400);
  }
  let numStock = 0;
  if (stock) {
    numStock = Number(stock);
  }

  if (active) {
    const validActive = ["true", "false"];
    if (!validActive.includes(active)) {
      throw new AppError("active must be a boolean", 400);
    }
  }

  const result = await products.insertOne({
    name,
    category,
    price: numPrice,
    stock: numStock,
    active: active || true,
  });

  const product = await products.findOne({ _id: result.insertedId });

  res.status(201).json({
    message: "created succefully",
    data: product,
  });
});

router.get("/", async (req, res) => {
  const result = await products.find({}).toArray();
  res.json({
    data: result,
  });
});

router.get("/stats", async (req, res) => {
  const stats = await products
    .aggregate([
      { $match: { active: true } },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
          avgPrice: { $avg: "$price" },
          totalStock: { $sum: "$stock" },
        },
      },
      { $sort: { count: -1 } },
    ])
    .toArray();
  res.json({
    data: stats,
  });
});

router.patch("/:id/stock", async (req, res) => {
  const { amount } = req.body;
  const amountNum = Number(amount);
  const { id } = req.params;
  const product = await products.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $inc: { stock: amountNum } },
    { returnDocument: "after" },
  );
  if (!product) {
    throw new AppError("data not fond", 404);
  }
  res.json({
    data: product,
  });
});

export default router;
