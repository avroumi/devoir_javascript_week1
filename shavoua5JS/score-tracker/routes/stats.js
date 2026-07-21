import { Router } from "express";
import { db } from "../db/mongo.js";

const router = Router();
const scores = db.collection("scores");

router.get("/", async (require, res) => {
  const result = await scores
    .aggregate([
      {
        $facet: {
          highestScore: [
            { $sort: { points: -1 } },
            { $limit: 1 },
            {
              $project: {
                _id: 0,
                playerName: 1,
                game: 1,
                points: 1,
              },
            },
          ],
          totalScores: [{ $count: "total" }],
          mostPopularGame: [
            {
              $group: {
                _id: "$game",
                submissions: {
                  $sum: 1,
                },
              },
            },
            {
              $sort: {
                submissions: -1,
              },
            },
            { $limit: 1 },
            {
              $project: {
                _id: 0,
                game: "$_id",
                submissions: 1,
              },
            },
          ],
          averageScore: [
            {
              $group: {
                _id: null,
                average: {
                  $avg: "$points",
                },
              },
            },
            {
              $project: {
                _id: 0,
                average: 1,
              },
            },
          ],
        },
      },
    ])
    .toArray();
  res.json({
    data: result[0],
  });
});

export default router;
