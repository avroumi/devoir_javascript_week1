import express from "express"
import orderRoutes from "./routes/ordersRoutes.js"
import {logger} from "./middlewares/logger.js"
import {errorHandler} from "./middlewares/errorHandler.js"

const app = express()

app.use(express.json())
app.use(logger)

app.use("/orders", orderRoutes)

app.use((req, res, next) => {
    next({
        status: 404,
        message : "Route not found"
    })
})


app.use(errorHandler)

export default app 