# VIGIL — Secret Superhero Archive API

VIGIL is a vanilla Node.js backend project that manages a secret archive of superheroes.

The API allows agents to create, read, update, delete, filter, search, sort, paginate, and analyze superhero records stored in a local JSON file.

This project is built with **vanilla Node.js** using the native `http` module.  
No Express framework is used.

---

## Project Goals

This project practices:

- Building a clean CRUD API
- Working with vanilla Node.js HTTP server
- Reading and writing JSON files
- Parsing request bodies manually
- Handling routes manually without Express
- Filtering with query parameters
- Advanced searching with request body
- Sorting and pagination
- Building archive statistics
- Returning consistent API responses
- Handling errors with proper status codes

---

## Project Structure

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

Main Architecture

The project is divided into clear layers.

server.js

Main entry point of the application.

Responsibilities:

Creates the HTTP server with http.createServer
Parses the request URL using new URL
Handles GET /health
Sends requests to route handlers
Calls notFound if no route matches
Starts the server on port 3000

Request flow:
server.js
↓
heroes.routes.js / stats.routes.js
↓
services
↓
data/heroesData.js
↓
data/heroes.json

Data Layer
data/heroes.json

Local JSON file used as the database.

Each hero record has this structure:
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

Allowed hero statuses:

active
retired
missing
deceased

data/heroesData.js

This file is responsible only for reading and writing the JSON file.

readHeroes()

Reads all heroes from data/heroes.json.

Responsibilities:

Opens the JSON file
Reads it as UTF-8 text
Parses the JSON string into a JavaScript array
Returns the heroes array

Used by:

getAllHeroes
getHeroesById
createHero
updateHero
deleteHero
getHeroesStats
writeHeroes(data)

Writes the full heroes array into data/heroes.json.

Responsibilities:

Receives a full array of heroes
Converts it to JSON with JSON.stringify
Writes it back to the JSON file

Important:

This function should always write a JSON string, not a raw JavaScript object.

Correct idea:

JavaScript array
↓
JSON.stringify(...)
↓
write to heroes.json
Utilities
utils/response.js

Centralizes all API responses.

This prevents repeating:

res.statusCode
Content-Type
JSON.stringify
res.end
sendSuccess(res, statusCode, data, meta = null)

Sends a successful JSON response.

Used for:

Successful GET requests
Created hero
Updated hero
Deleted hero
Search results
Stats

Basic response:

{
"success": true,
"data": {}
}

With pagination metadata:

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
sendError(res, statusCode, message)

Sends an error JSON response.

Example:

{
"success": false,
"message": "Hero not found"
}

Used when:

Validation fails
Hero does not exist
Route does not exist
Duplicate codeName
Invalid JSON body
Internal server error
utils/parseBody.js

In vanilla Node.js, there is no req.body.

This utility manually reads the request body from the request stream.

parseBody(req)

Responsibilities:

Listens to the "data" event
Collects all chunks of the request body
Listens to the "end" event
Converts the JSON string into a JavaScript object
Returns {} if the body is empty
Throws a 400 error if the JSON is invalid
Handles stream errors with a 500 error

Used by:

POST /heroes
PATCH /heroes/:id
POST /heroes/search

Request body flow:

Client sends JSON
↓
Node receives chunks
↓
parseBody joins chunks
↓
JSON.parse
↓
JavaScript object

Middleware
middlewares/notFound.js

Handles all undefined routes.

notFound(res)

Returns a clean 404 response.

Example:

{
"success": false,
"message": "Route not found"
}

Used when no route handler matches the request.

Heroes Service

File:

services/heroes.service.js

This file contains the main CRUD logic for heroes.

getAllHeroes()

Returns all heroes from the JSON file.

Responsibilities:

Calls readHeroes
Returns the full heroes array

Used by:

GET /heroes
POST /heroes/search
GET /stats
getHeroesById(id)

Finds one hero by ID.

Responsibilities:

Converts the URL id from string to number
Reads all heroes
Finds the hero with the matching id
Throws 404 if the hero does not exist
Returns the hero if found

Example:

GET /heroes/2
createHero(heroData)

Creates a new hero.

Responsibilities:

Reads all existing heroes
Validates required fields
Checks that codeName is unique
Creates a new id
Adds createdAt
Adds updatedAt
Sets default status to active if missing
Saves the updated heroes array
Returns the new hero

Required fields:

codeName
powers
threatLevel

Validation rules:

codeName must be a non-empty string
codeName must be unique
powers must be a non-empty array
Every power must be a string
threatLevel must be an integer between 1 and 10
status, if provided, must be valid
affiliations, if provided, must be an array

Possible errors:

400 Invalid data
409 codeName already exists
updateHero(id, updateData)

Updates an existing hero partially.

Used by:

PATCH /heroes/:id

Responsibilities:

Reads all heroes
Finds the hero by id
Throws 404 if not found
Prevents updating id
Prevents updating createdAt
Validates fields if they are provided
Checks duplicate codeName against other heroes
Merges old hero data with new data
Updates updatedAt
Saves the updated heroes array
Returns the updated hero

Example body:

{
"status": "missing"
}

Only the provided fields are changed.

deleteHero(id)

Deletes a hero by id.

Used by:

DELETE /heroes/:id

Responsibilities:

Reads all heroes
Checks if the hero exists
Removes the hero from the array
Saves the updated array
Returns a success message

Possible error:

404 Hero not found
Search Service

File:

services/search.service.js

This file contains filtering, sorting, pagination, and advanced search logic.

filterHeroesByQuery(heroes, query)

Used by:

GET /heroes

Filters heroes using query parameters from the URL.

Supported query parameters:

status
power
minLevel
maxLevel
search
sortBy
order
page
limit
status

Filters by exact hero status.

Example:

GET /heroes?status=active
power

Filters heroes that contain a specific power inside their powers array.

Example:

GET /heroes?power=speed
minLevel

Returns heroes whose threatLevel is greater than or equal to the given value.

Example:

GET /heroes?minLevel=7
maxLevel

Returns heroes whose threatLevel is less than or equal to the given value.

Example:

GET /heroes?maxLevel=8
search

Searches text inside:

codeName
notes

Example:

GET /heroes?search=mission

The search is case-insensitive.

sortBy

Sorts results by one of these fields:

codeName
threatLevel
firstSighting

Example:

GET /heroes?sortBy=threatLevel
order

Controls sort direction.

Allowed values:

asc
desc

Default:

asc

Example:

GET /heroes?sortBy=threatLevel&order=desc
page and limit

Used for pagination.

Example:

GET /heroes?page=1&limit=2

Response includes metadata:

"meta": {
"total": 4,
"page": 1,
"limit": 2,
"totalPages": 2
}
advancedSearchHeroes(heroes, body)

Used by:

POST /heroes/search

Performs advanced search using a JSON body.

Supported body fields:

statuses
powers
minLevel
maxLevel
affiliations
sortBy
order

Example body:

{
"statuses": ["active", "missing"],
"powers": ["speed", "flight"],
"minLevel": 4,
"maxLevel": 9,
"affiliations": ["VIGIL"],
"sortBy": "threatLevel",
"order": "desc"
}

Rules:

statuses: hero status must be one of the given values
powers: hero must have at least one requested power
minLevel: hero threat level must be greater than or equal
maxLevel: hero threat level must be less than or equal
affiliations: hero must belong to at least one requested affiliation
Multiple fields are combined with AND logic
Multiple values inside the same array are combined with OR logic
Empty body {} returns all heroes
Stats Service

File:

services/stats.service.js
getHeroesStats()

Used by:

GET /stats

Calculates global archive statistics.

Returns:

totalHeroes
byStatus
averageThreatLevel
mostCommonPower
highestThreat
newestRecord
totalHeroes

Total number of heroes in the archive.

Example:

"totalHeroes": 4
byStatus

Counts heroes by status.

Example:

"byStatus": {
"active": 2,
"retired": 1,
"missing": 0,
"deceased": 1
}
averageThreatLevel

Average of all hero threatLevel values.

Example:

"averageThreatLevel": 6.5
mostCommonPower

The power that appears most often among all heroes.

Example:

"mostCommonPower": "flight"
highestThreat

The hero with the highest threatLevel.

newestRecord

The hero record with the most recent createdAt date.

Routes
Health Route
GET /health

Checks if the server is running.

Example:

curl "http://localhost:3000/health"

Response:

{
"success": true,
"data": "Hello to healthy server"
}
Heroes Routes
GET /heroes

Returns heroes with filtering, sorting, and pagination.

Example:

curl "http://localhost:3000/heroes"

With filters:

curl "http://localhost:3000/heroes?status=active"
curl "http://localhost:3000/heroes?power=speed"
curl "http://localhost:3000/heroes?minLevel=7"
curl "http://localhost:3000/heroes?sortBy=threatLevel&order=desc"
curl "http://localhost:3000/heroes?page=1&limit=2"
GET /heroes/:id

Returns one hero by id.

Example:

curl "http://localhost:3000/heroes/2"

Possible errors:

404 Hero not found
POST /heroes

Creates a new hero.

Example:

curl -X POST "http://localhost:3000/heroes" \
 -H "Content-Type: application/json" \
 -d '{
"codeName": "Blue Falcon",
"powers": ["flight", "speed"],
"threatLevel": 7,
"status": "active",
"origin": "Unknown",
"affiliations": ["VIGIL"],
"firstSighting": "2026-01-01",
"notes": "New registered hero"
}'

Success status:

201 Created
PATCH /heroes/:id

Updates part of an existing hero.

Example:

curl -X PATCH "http://localhost:3000/heroes/2" \
 -H "Content-Type: application/json" \
 -d '{
"status": "missing"
}'

Possible errors:

400 Invalid data
404 Hero not found
409 codeName already exists
DELETE /heroes/:id

Deletes a hero.

Example:

curl -X DELETE "http://localhost:3000/heroes/2"

Possible errors:

404 Hero not found
POST /heroes/search

Advanced search using request body.

Example:

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

Empty body returns all heroes:

curl -X POST "http://localhost:3000/heroes/search" \
 -H "Content-Type: application/json" \
 -d '{}'
Stats Route
GET /stats

Returns archive statistics.

Example:

curl "http://localhost:3000/stats"

Response example:

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
"mostCommonPower": "flight",
"highestThreat": {},
"newestRecord": {}
}
}
Error Responses

All errors follow this structure:

{
"success": false,
"message": "Error message"
}

Common status codes:

Status Code Meaning
200 Successful request
201 Hero created
400 Invalid input or invalid JSON
404 Hero or route not found
409 Duplicate codeName
500 Internal server error

How to Run the Project

1. Clone the repository
   git clone <your-repository-url>
   cd superHeroProject
2. Install dependencies

This project uses vanilla Node.js and does not require Express.

If a package.json exists:

npm install 3. Start the server
node server.js

The server runs on:

http://localhost:3000
Recommended Test Commands
Health
curl "http://localhost:3000/health"
Get all heroes
curl "http://localhost:3000/heroes"
Get hero by id
curl "http://localhost:3000/heroes/1"
Filter by status
curl "http://localhost:3000/heroes?status=active"
Filter by power
curl "http://localhost:3000/heroes?power=speed"
Filter by level
curl "http://localhost:3000/heroes?minLevel=7"
Sort by threat level
curl "http://localhost:3000/heroes?sortBy=threatLevel&order=desc"
Pagination
curl "http://localhost:3000/heroes?page=1&limit=2"
Create hero
curl -X POST "http://localhost:3000/heroes" \
 -H "Content-Type: application/json" \
 -d '{
"codeName": "Night Arrow",
"powers": ["precision", "stealth"],
"threatLevel": 5
}'
Update hero
curl -X PATCH "http://localhost:3000/heroes/1" \
 -H "Content-Type: application/json" \
 -d '{
"status": "missing"
}'
Delete hero
curl -X DELETE "http://localhost:3000/heroes/1"
Advanced search
curl -X POST "http://localhost:3000/heroes/search" \
 -H "Content-Type: application/json" \
 -d '{
"statuses": ["active"],
"powers": ["speed"]
}'
Stats
curl "http://localhost:3000/stats"
Invalid route
curl "http://localhost:3000/unknown-route"

Expected:

{
"success": false,
"message": "Route not found"
}
Notes
This project does not use Express.
Request bodies are parsed manually using Node.js streams.
Data is stored in a local JSON file.
All responses follow a consistent format.
The code is separated into routes, services, data, utilities, and middleware.

The project is designed to demonstrate backend fundamentals using only vanilla Node.js.
