<div align="center">

<img
  src="https://capsule-render.vercel.app/api?type=waving&color=0:0f2027,50:203a43,100:2c5364&height=210&section=header&text=Score%20Tracker%20API&fontSize=46&fontColor=ffffff&fontAlignY=36&animation=fadeIn&desc=Retro%20games.%20Live%20scores.%20Real%20competition.&descAlignY=58&descSize=18"
  width="100%"
  alt="Score Tracker API banner"
/>

<img
  src="https://readme-typing-svg.demolab.com?font=Press+Start+2P&size=17&duration=2500&pause=800&color=00D9FF&center=true&vCenter=true&width=900&lines=INSERT+COIN...;SAVE+YOUR+HIGH+SCORE;CLIMB+THE+LEADERBOARD;BECOME+THE+RETRO+CHAMPION"
  alt="Animated Score Tracker introduction"
/>

<br />

[![Node.js](https://img.shields.io/badge/Node.js-24-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES%20Modules-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000000)](https://developer.mozilla.org/docs/Web/JavaScript)

<br />

**A REST API for storing retro-game scores and generating live leaderboards, player profiles, and global statistics.**

Built with the native MongoDB driver — **no Mongoose**.

</div>

---

## About the project

**Score Tracker API** is a backend application designed for retro games such as:

- Tetris
- Snake
- Space Invaders
- Any additional game submitted dynamically

Players can submit scores, compare their results, view their personal performance, and discover the most popular game.

MongoDB Atlas stores every score in the cloud, making new submissions immediately visible in **Browse Collections**.

---

## Features

- Submit player scores to MongoDB Atlas
- Accept optional and dynamic document fields
- Validate required score information
- Generate a top-10 leaderboard for a specific game
- Generate a global top-10 leaderboard
- Automatically calculate player ranks
- Display all scores for a selected player
- Calculate the best score per game
- Generate several statistics in one aggregation request
- Return available games without duplicates
- Centralized Express error handling
- Native MongoDB aggregation pipelines

---

## Tech stack

| Technology                 | Purpose                                |
| -------------------------- | -------------------------------------- |
| **Node.js**                | JavaScript runtime                     |
| **Express 5**              | HTTP server and API routing            |
| **MongoDB Atlas**          | Cloud database                         |
| **MongoDB Node.js Driver** | Native database connection and queries |
| **dotenv**                 | Environment-variable management        |
| **ES Modules**             | Modern `import` / `export` syntax      |

---

## Project structure

```text
score-tracker/
├── db/
│   └── mongo.js
├── middlewares/
│   └── errorHandler.js
├── routes/
│   ├── scores.js
│   ├── leaderboard.js
│   ├── players.js
│   ├── stats.js
│   └── games.js
├── utils/
│   └── AppError.js
├── .env
├── .gitignore
├── package.json
└── server.js
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/score-tracker.git
cd score-tracker
```

### 2. Install the dependencies

```bash
npm install
```

### 3. Create the environment file

Create a `.env` file in the project root:

```env
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@YOUR_CLUSTER.mongodb.net/score-tracker
PORT=3000
```

> Never commit your `.env` file or MongoDB credentials to GitHub.

### 4. Start the server

```bash
npm run dev
```

Or:

```bash
npm start
```

The API should be available at:

```text
http://localhost:3000
```

---

## Score document

The three required fields are:

| Field        |   Type | Required | Description                 |
| ------------ | -----: | :------: | --------------------------- |
| `playerName` | String |   Yes    | Player name                 |
| `game`       | String |   Yes    | Game name                   |
| `points`     | Number |   Yes    | Score, must not be negative |

Common optional fields:

| Field      |   Type | Description              |
| ---------- | -----: | ------------------------ |
| `level`    | Number | Level reached            |
| `duration` | Number | Game duration in seconds |

Additional fields can also be submitted dynamically.

Example:

```json
{
  "playerName": "Aharon",
  "game": "tetris",
  "points": 9500,
  "level": 7,
  "duration": 240,
  "country": "Israel"
}
```

---

## API endpoints

| Method | Endpoint              | Description                                  |
| :----: | --------------------- | -------------------------------------------- |
| `POST` | `/scores`             | Submit a new score                           |
| `GET`  | `/leaderboard/global` | Get the global top 10                        |
| `GET`  | `/leaderboard/:game`  | Get the top 10 for one game                  |
| `GET`  | `/player/:name`       | Get a player profile and best score per game |
| `GET`  | `/stats`              | Get general platform statistics              |
| `GET`  | `/games`              | Get all game names without duplicates        |

---

## Submit a score

### Request

```bash
curl -X POST http://localhost:3000/scores \
  -H "Content-Type: application/json" \
  -d '{
    "playerName": "Aharon",
    "game": "tetris",
    "points": 9500,
    "level": 7,
    "duration": 240,
    "country": "Israel"
  }'
```

### Example response

```json
{
  "message": "Created successfully",
  "data": {
    "_id": "6a5f66a4462053f3d5e349b0",
    "playerName": "Aharon",
    "game": "tetris",
    "points": 9500,
    "level": 7,
    "duration": 240,
    "country": "Israel",
    "createdAt": "2026-07-21T12:31:32.766Z",
    "updatedAt": "2026-07-21T12:31:32.766Z"
  }
}
```

---

## Game leaderboard

Returns the ten highest scores for one game.

```bash
curl http://localhost:3000/leaderboard/tetris
```

Example:

```json
{
  "data": [
    {
      "playerName": "Aharon",
      "level": 7,
      "points": 9500,
      "rank": 1
    }
  ]
}
```

The ranking is generated with:

- `$match`
- `$setWindowFields`
- `$documentNumber`
- `$limit`
- `$project`

---

## Global leaderboard

Returns the ten highest scores across every game.

```bash
curl http://localhost:3000/leaderboard/global
```

Example:

```json
{
  "data": [
    {
      "playerName": "Aharon",
      "game": "tetris",
      "points": 9500,
      "createdAt": "2026-07-21T12:31:32.766Z",
      "rank": 1
    }
  ]
}
```

---

## Player profile

Returns all selected player scores and their highest score for each game.

```bash
curl http://localhost:3000/player/Aharon
```

Example:

```json
{
  "allScores": [
    {
      "playerName": "Aharon",
      "game": "tetris",
      "points": 9500
    }
  ],
  "bestPerGame": [
    {
      "game": "tetris",
      "best": 9500
    }
  ]
}
```

This endpoint uses `$facet` to run two aggregation pipelines in one database request.

---

## General statistics

```bash
curl http://localhost:3000/stats
```

The route calculates:

- Highest score ever
- Total number of submitted scores
- Most popular game
- Average score across every game

Example:

```json
{
  "highestScore": [
    {
      "playerName": "Aharon",
      "game": "tetris",
      "points": 9500
    }
  ],
  "totalScores": [
    {
      "total": 2
    }
  ],
  "mostPopularGame": [
    {
      "game": "tetris",
      "submissions": 2
    }
  ],
  "averageScore": [
    {
      "average": 9500
    }
  ]
}
```

All four results are calculated in a single aggregation using `$facet`.

---

## Available games

Returns all game names stored in the database without duplicates.

```bash
curl http://localhost:3000/games
```

Example:

```json
{
  "games": ["snake", "space-invaders", "tetris"]
}
```

This endpoint uses MongoDB's native `distinct()` method.

---

## Main MongoDB concepts

| MongoDB feature    | Usage                                |
| ------------------ | ------------------------------------ |
| `insertOne()`      | Save a score                         |
| `findOne()`        | Return the newly created score       |
| `distinct()`       | Get unique game names                |
| `$match`           | Filter documents                     |
| `$sort`            | Sort scores                          |
| `$limit`           | Keep only top results                |
| `$project`         | Select returned fields               |
| `$group`           | Group scores by game                 |
| `$max`             | Find the highest score               |
| `$avg`             | Calculate the average                |
| `$sum`             | Count submissions                    |
| `$facet`           | Run several pipelines simultaneously |
| `$setWindowFields` | Calculate leaderboard positions      |
| `$documentNumber`  | Generate ranks                       |

---

## Error handling

Invalid requests return a structured JSON response.

Example:

```json
{
  "message": "Points must be a valid positive integer",
  "statusCode": 400
}
```

Example invalid request:

```bash
curl -X POST http://localhost:3000/scores \
  -H "Content-Type: application/json" \
  -d '{
    "playerName": "Aharon",
    "game": "tetris",
    "points": -50
  }'
```

---

## Possible future improvements

- Daily leaderboard
- Player rank for a selected game
- Delete a score by ID
- Case-insensitive player search
- Pagination
- Automated tests
- Swagger / OpenAPI documentation
- Authentication
- Game-name validation
- Docker support

---

## Learning goals

This project demonstrates:

- REST API architecture
- Express routers and middleware
- Environment variables
- MongoDB Atlas integration
- Native MongoDB queries
- Aggregation pipelines
- Dynamic MongoDB documents
- Error handling
- Asynchronous JavaScript
- ES Modules

---

<div align="center">
