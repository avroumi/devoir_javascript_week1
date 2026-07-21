import { db } from "../db/mongo.js";
import express from "express";
import AppError from "../utils/AppError.js";

const router = express.Router();
const scores = db.collection("scores");

router.post("/", async (req, res) => {
  const body = req.body;
  const { _id, playerName, game, points } = body;

  if (!playerName || !game || points === undefined) {
    throw new AppError("Player name , game and points must be not empty", 400);
  }
  const pointsNum = Number(points);

  if (!Number.isInteger(pointsNum) || pointsNum < 0) {
    throw new AppError("Points must be a valid positive integer", 400);
  }
  const scoreData = {
    ...body,
    playerName,
    game,
    points: pointsNum,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const success = await scores.insertOne(scoreData);
  const score = await scores.findOne({ _id: success.insertedId });

  res.status(201).json({
    message: "Created succesfuly",
    data: score,
  });
});

export default router;
