import express from "express"
import mainRoutes from "./routes/main.routes.js"
import { errorMiddleware } from "./middlewares/error.middelware.js"

const app = express()

app.use(express.json())

app.use("/", mainRoutes)










app.use(errorMiddleware)

export default app 