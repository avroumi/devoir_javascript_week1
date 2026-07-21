import { Router } from "express";
import { db } from "../db/mongo.js";

const router = Router();
const scores = db.collection("scores");

router.get("/:name", async (req, res) => {
  const { name } = req.params;
  const result = await scores
    .aggregate([
      {
        $match: {
          playerName: name,
        },
      },
      {
        $facet: {
          allScores: [
            {
              $sort: {
                createdAt: -1,
              },
            },
            {
              $project: {
                _id: 0,
                playerName: 1,
                game: 1,
                points: 1,
              },
            },
          ],

          bestPerGame: [
            {
              $group: {
                _id: "$game",
                best: {
                  $max: "$points",
                },
              },
            },
            {
              $project: {
                _id: 0,
                game: "$_id",
                best: 1,
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
