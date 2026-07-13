import express from "express"


import mainRoutes from "./routes/main.routes.js"
import cartRoutes from "./routes/cart.routes.js"
import accountRoutes from "./routes/account.routes.js"
import productRoutes from "./routes/products.routes.js"
import ordersRoutes from "./routes/orders.routes.js"


import { errorMiddleware } from "./middlewares/error.middelware.js"
import { notFoundMiddleware } from "./middlewares/notFound.middleware.js"



const app = express()

app.use(express.json())

app.use("/", mainRoutes)
app.use("/products", productRoutes)
app.use("/cart", cartRoutes)
app.use("/account", accountRoutes)
app.use("/orders", ordersRoutes)










app.use(notFoundMiddleware)

app.use(errorMiddleware)

export default app 