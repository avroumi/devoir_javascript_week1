import dotenv from "dotenv"

dotenv.config()

export const port = process.env.PORT
export const dbBasePath = process.env.DB_BASE_PATH
export const startingBalance = Number(process.env.STARTING_BALANCE)