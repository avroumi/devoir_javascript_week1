import app from "./app.js"
import { port } from "./config/env.js"

app.listen(port, () => console.log(`Hello and welcome to Tamim Leolamim on port ${port}`))