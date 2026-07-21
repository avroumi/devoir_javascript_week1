import { Router } from "express";
import { db } from "../db/mongo.js";

const router = Router();
const scores = db.collection("scores");

router.get("/", async (req, res) => {
  const games = await scores.distinct("game");
  res.json({
    data: games,
  });
});

export default router;
