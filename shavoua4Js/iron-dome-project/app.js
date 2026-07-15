import express from "express"
import "dotenv/config"
import { errorHandler } from "./middleware/errorHandler.js"
import operatorRouter from "./routes/operatorsRoutes.js"

const app = express()

app.use(express.json())

app.use("/operators", operatorRouter)





app.use(errorHandler)
app.listen(process.env.PORT, () => console.log(`hello to iron dome `, process.env.PORT ))