import express from "express"
import mainRoutes from "./routes/main.routes.js"
import productRoutes from "./routes/products.routes.js"
import { errorMiddleware } from "./middlewares/error.middelware.js"
import { notFoundMiddleware } from "./middlewares/notFound.middleware.js"

const app = express()

app.use(express.json())

app.use("/", mainRoutes)
app.use("/products", productRoutes)










app.use(notFoundMiddleware)

app.use(errorMiddleware)

export default app 