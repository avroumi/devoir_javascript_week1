import express from "express";
import { client, db } from "./db/mongo.js";
import "dotenv/config";
import { ErrorHandler } from "./utils/errorHandler.js";

import scoresRouter from "./routes/scores.js";
import leaderboardRouter from "./routes/leaderboard.js";
import playerRouter from "./routes/players.js";
import statsRouter from "./routes/stats.js";
import gamesRouter from "./routes/games.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Score tracker api",
    database: "connected",
  });
});

app.use("/scores", scoresRouter);
app.use("/leaderboard", leaderboardRouter);
app.use("/player", playerRouter);
app.use("/stats", statsRouter);
app.use("/games", gamesRouter);

app.use(ErrorHandler);

app.listen(process.env.PORT, () =>
  console.log("Welcome to score-tracker project , port : ", process.env.PORT),
);

process.on("SIGINT", () => {
  client.close();
});
