<div align="center">

# 🕵️‍♂️ VIGIL — Secret Superhero Archive API

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=24&pause=1000&center=true&vCenter=true&width=700&lines=Vanilla+Node.js+Backend;Secret+Superhero+Archive;CRUD+%2B+Filters+%2B+Search+%2B+Stats" alt="Typing animation" />

<br/>

![Node.js](https://img.shields.io/badge/Node.js-Vanilla-green?style=for-the-badge&logo=node.js)
![No Express](https://img.shields.io/badge/Express-Not%20Used-red?style=for-the-badge)
![Storage](https://img.shields.io/badge/Storage-JSON-blue?style=for-the-badge)
![API](https://img.shields.io/badge/API-REST-orange?style=for-the-badge)

</div>

---

## 📌 Project Overview

**VIGIL** is a vanilla Node.js backend API for managing a secret superhero archive.

The system allows VIGIL agents to:

- create superhero records
- read all heroes or one hero by ID
- update hero information
- delete hero records
- filter heroes with query parameters
- perform advanced searches using a JSON body
- sort and paginate results
- get global archive statistics

This project is built with the native Node.js `http` module.

> No Express.  
> No framework.  
> Pure vanilla Node.js backend logic.

---

## 🧠 Main Concepts Practiced

- Vanilla Node.js HTTP server
- Manual routing
- Manual body parsing with streams
- JSON file storage
- CRUD architecture
- Query parameters
- Advanced body search
- Sorting
- Pagination
- Statistics calculation
- Clean project structure
- Reusable response helpers
- Error handling

---

## 🗂️ Project Structure

```txt
superHeroProject/
│
├── server.js
├── package.json
├── README.md
├── .gitignore
│
├── data/
│   ├── heroes.json
│   └── heroesData.js
│
├── routes/
│   ├── heroes.routes.js
│   └── stats.routes.js
│
├── services/
│   ├── heroes.service.js
│   ├── search.service.js
│   └── stats.service.js
│
├── utils/
│   ├── response.js
│   └── parseBody.js
│
└── middlewares/
    └── notFound.js
```

---

## 🧭 Request Flow

```txt
Client Request
     ↓
server.js
     ↓
routes/
     ↓
services/
     ↓
data/heroesData.js
     ↓
data/heroes.json
```

Example:

```txt
GET /heroes?status=active
     ↓
server.js
     ↓
handleHeroesRoutes()
     ↓
getAllHeroes()
     ↓
filterHeroesByQuery()
     ↓
sendSuccess()
```

---

# 🚀 How to Run

## 1. Install dependencies

If you already have `package.json`:

```bash
npm install
```

This project does not require Express.

---

## 2. Start the server

```bash
node server.js
```

Server runs on:

```txt
http://localhost:3000
```

---

## 3. Test health route

```bash
curl "http://localhost:3000/health"
```

Expected response:

```json
{
  "success": true,
  "data": "Hello to healthy server"
}
```

---

# 🦸 Hero Data Model

Each hero record looks like this:

```json
{
  "id": 1,
  "codeName": "Corona",
  "powers": ["telekinesis", "fire resistance"],
  "threatLevel": 8,
  "status": "missing",
  "origin": "Unknown experimental facility",
  "affiliations": ["VIGIL", "Independent"],
  "firstSighting": "2021-03-12",
  "notes": "Disappeared during a night mission.",
  "createdAt": "2026-07-06T10:00:00.000Z",
  "updatedAt": "2026-07-06T10:00:00.000Z"
}
```

---

## ✅ Allowed Status Values

```txt
active
retired
missing
deceased
```

---

# 🛣️ API Routes

## General Routes

| Method | Route | Description |
|---|---|---|
| GET | `/health` | Check if the server is running |
| GET | `/stats` | Get archive statistics |

---

## Heroes Routes

| Method | Route | Description |
|---|---|---|
| GET | `/heroes` | Get all heroes with filters, sorting and pagination |
| GET | `/heroes/:id` | Get one hero by ID |
| POST | `/heroes` | Create a new hero |
| PATCH | `/heroes/:id` | Partially update a hero |
| DELETE | `/heroes/:id` | Delete a hero |
| POST | `/heroes/search` | Advanced search using request body |

---

# 📦 Response Format

## Success

```json
{
  "success": true,
  "data": {}
}
```

## Success with Pagination

```json
{
  "success": true,
  "data": [],
  "meta": {
    "total": 4,
    "page": 1,
    "limit": 2,
    "totalPages": 2
  }
}
```

## Error

```json
{
  "success": false,
  "message": "Error message"
}
```

---

# 📁 File-by-File Explanation

---

## `server.js`

Main entry point of the application.

### Responsibilities

- creates the HTTP server
- parses the request URL
- handles `/health`
- sends requests to route handlers
- calls `notFound()` if no route matches
- starts the server on port `3000`

---

## `data/heroes.json`

Local JSON file used as the database.

It stores the full list of superhero records.

Important:

```txt
This file must always contain valid JSON.
```

Example valid empty state:

```json
[]
```

---

## `data/heroesData.js`

Handles only file reading and writing.

### `readHeroes()`

Reads all heroes from `heroes.json`.

| Step | Description |
|---|---|
| 1 | Reads the JSON file |
| 2 | Converts JSON text into JavaScript data |
| 3 | Returns the heroes array |

---

### `writeHeroes(data)`

Writes the full heroes array back into `heroes.json`.

| Step | Description |
|---|---|
| 1 | Receives the full heroes array |
| 2 | Converts it using `JSON.stringify` |
| 3 | Writes it into the JSON file |

---

## `utils/response.js`

Centralizes API responses.

### `sendSuccess(res, statusCode, data, meta = null)`

Sends a successful response.

Used for:

- `GET /heroes`
- `GET /heroes/:id`
- `POST /heroes`
- `PATCH /heroes/:id`
- `DELETE /heroes/:id`
- `POST /heroes/search`
- `GET /stats`

---

### `sendError(res, statusCode, message)`

Sends an error response.

Used for:

- invalid input
- invalid JSON
- hero not found
- route not found
- duplicate `codeName`
- internal errors

---

## `utils/parseBody.js`

Vanilla Node.js does not provide `req.body`.

This utility manually reads the request body.

### `parseBody(req)`

| Event | Purpose |
|---|---|
| `data` | Receives chunks of the body |
| `end` | Body is complete, then JSON is parsed |
| `error` | Handles stream reading errors |

Used by:

```txt
POST /heroes
PATCH /heroes/:id
POST /heroes/search
```

---

## `middlewares/notFound.js`

Handles routes that do not exist.

### `notFound(res)`

Returns:

```json
{
  "success": false,
  "message": "Route not found"
}
```

---

# ⚙️ Services

---

## `services/heroes.service.js`

Contains CRUD logic.

---

### `getAllHeroes()`

Returns all heroes.

Used by:

```txt
GET /heroes
POST /heroes/search
GET /stats
```

---

### `getHeroesById(id)`

Finds one hero by ID.

If the hero does not exist, it throws a `404` error.

Used by:

```txt
GET /heroes/:id
```

---

### `createHero(heroData)`

Creates a new hero.

### Required fields

| Field | Rule |
|---|---|
| `codeName` | required, string, non-empty, unique |
| `powers` | required, non-empty array |
| `threatLevel` | required, integer between 1 and 10 |

### Optional fields

| Field | Default |
|---|---|
| `status` | `active` |
| `origin` | empty string |
| `affiliations` | empty array |
| `firstSighting` | empty string |
| `notes` | empty string |

### Automatically generated

```txt
id
createdAt
updatedAt
```

---

### `updateHero(id, updateData)`

Partially updates a hero.

Used by:

```txt
PATCH /heroes/:id
```

Rules:

- cannot update `id`
- cannot update `createdAt`
- validates fields only if they are sent
- checks duplicate `codeName`
- updates `updatedAt`

---

### `deleteHero(id)`

Deletes a hero by ID.

Used by:

```txt
DELETE /heroes/:id
```

If the hero does not exist, it throws a `404`.

---

## `services/search.service.js`

Contains filtering, sorting, pagination and advanced search.

---

### `filterHeroesByQuery(heroes, query)`

Used by:

```txt
GET /heroes
```

Supports:

| Query Param | Description |
|---|---|
| `status` | Filter by status |
| `power` | Filter by one power |
| `minLevel` | Minimum threat level |
| `maxLevel` | Maximum threat level |
| `search` | Search in `codeName` and `notes` |
| `sortBy` | Sort by field |
| `order` | `asc` or `desc` |
| `page` | Page number |
| `limit` | Results per page |

---

### Query Examples

```bash
curl "http://localhost:3000/heroes?status=active"
```

```bash
curl "http://localhost:3000/heroes?power=speed"
```

```bash
curl "http://localhost:3000/heroes?minLevel=7"
```

```bash
curl "http://localhost:3000/heroes?sortBy=threatLevel&order=desc"
```

```bash
curl "http://localhost:3000/heroes?page=1&limit=2"
```

---

### `advancedSearchHeroes(heroes, body)`

Used by:

```txt
POST /heroes/search
```

Supports:

| Body Field | Description |
|---|---|
| `statuses` | Array of allowed statuses |
| `powers` | Array of powers |
| `minLevel` | Minimum threat level |
| `maxLevel` | Maximum threat level |
| `affiliations` | Array of affiliations |
| `sortBy` | Sort field |
| `order` | Sort direction |

---

### Advanced Search Example

```bash
curl -X POST "http://localhost:3000/heroes/search" \
  -H "Content-Type: application/json" \
  -d '{
    "statuses": ["active", "missing"],
    "powers": ["speed", "flight"],
    "minLevel": 4,
    "maxLevel": 9,
    "affiliations": ["VIGIL", "Independent"],
    "sortBy": "threatLevel",
    "order": "desc"
  }'
```

Rules:

```txt
Different fields = AND logic
Values inside arrays = OR logic
```

Example:

```json
{
  "statuses": ["active", "missing"],
  "powers": ["speed", "flight"]
}
```

Means:

```txt
Hero must be active OR missing
AND
Hero must have speed OR flight
```

---

## `services/stats.service.js`

Contains archive statistics logic.

---

### `getHeroesStats()`

Used by:

```txt
GET /stats
```

Returns:

| Field | Description |
|---|---|
| `totalHeroes` | Total number of heroes |
| `byStatus` | Count by status |
| `averageThreatLevel` | Average threat level |
| `mostCommonPower` | Most frequent power |
| `highestThreat` | Hero with highest threat level |
| `newestRecord` | Most recently created hero |

---

# 📊 Stats Example

```bash
curl "http://localhost:3000/stats"
```

Example response:

```json
{
  "success": true,
  "data": {
    "totalHeroes": 4,
    "byStatus": {
      "active": 2,
      "retired": 1,
      "missing": 0,
      "deceased": 1
    },
    "averageThreatLevel": 6.5,
    "mostCommonPower": "speed",
    "highestThreat": {
      "id": 4,
      "codeName": "Old Thunder",
      "threatLevel": 9
    },
    "newestRecord": {
      "id": 5,
      "codeName": "Glass Fox"
    }
  }
}
```

---

# 🧪 Recommended Tests

## Health

```bash
curl "http://localhost:3000/health"
```

## Get all heroes

```bash
curl "http://localhost:3000/heroes"
```

## Get hero by ID

```bash
curl "http://localhost:3000/heroes/2"
```

## Create hero

```bash
curl -X POST "http://localhost:3000/heroes" \
  -H "Content-Type: application/json" \
  -d '{
    "codeName": "Night Arrow",
    "powers": ["precision", "stealth"],
    "threatLevel": 5
  }'
```

## Update hero

```bash
curl -X PATCH "http://localhost:3000/heroes/2" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "missing"
  }'
```

## Delete hero

```bash
curl -X DELETE "http://localhost:3000/heroes/2"
```

## Advanced search

```bash
curl -X POST "http://localhost:3000/heroes/search" \
  -H "Content-Type: application/json" \
  -d '{
    "statuses": ["active"],
    "powers": ["speed"]
  }'
```

## Stats

```bash
curl "http://localhost:3000/stats"
```

## Invalid route

```bash
curl "http://localhost:3000/not-existing"
```

Expected:

```json
{
  "success": false,
  "message": "Route not found"
}
```

---

# 🚦 Status Codes

| Code | Meaning |
|---|---|
| `200` | Request successful |
| `201` | Hero created |
| `400` | Invalid input or invalid JSON |
| `404` | Hero or route not found |
| `409` | Duplicate `codeName` |
| `500` | Internal server error |

---

# ✨ Features Completed

```txt
✅ Vanilla Node.js server
✅ Manual routing
✅ JSON database
✅ Manual body parser
✅ Uniform responses
✅ CRUD heroes
✅ Query filters
✅ Search by text
✅ Sort
✅ Pagination with meta
✅ Advanced body search
✅ Stats endpoint
✅ Not found middleware
```

---

<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=20&pause=1000&center=true&vCenter=true&width=600&lines=Built+with+Vanilla+Node.js;No+Express+Needed;VIGIL+Archive+Operational" alt="Typing animation" />

</div>

