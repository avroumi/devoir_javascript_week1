import { MongoClient } from "mongodb";
import "dotenv/config";

const client = new MongoClient(process.env.MONGO_URI);

await client.connect();

export const db = client.db("score-tracker");
console.log("database connected");
