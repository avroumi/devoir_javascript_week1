import { Router } from "express";
import { db } from "../db/mongo.js";

const scores = db.collection("scores");

const router = Router();

router.get("/global", async (req, res) => {
  const result = await scores
    .aggregate([
      {
        $setWindowFields: {
          sortBy: { points: -1 },
          output: {
            rank: {
              $documentNumber: {},
            },
          },
        },
      },
      { $limit: 10 },
      {
        $project: {
          _id: 0,
          playerName: 1,
          game: 1,
          points: 1,
          rank: 1,
          createdAt: 1,
        },
      },
    ])
    .toArray();

  res.json({
    data: result,
  });
});

router.get("/:game", async (req, res) => {
  const { game } = req.params;
  const result = await scores
    .aggregate([
      { $match: { game } },
      {
        $setWindowFields: {
          sortBy: { points: -1 },
          output: {
            rank: {
              $documentNumber: {},
            },
          },
        },
      },
      { $limit: 10 },
      { $project: { rank: 1, _id: 0, playerName: 1, level: 1, points: 1 } },
    ])
    .toArray();

  res.json({
    data: result,
  });
});

export default router;
