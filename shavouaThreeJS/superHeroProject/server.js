import http from "http"
import {URL} from "url"
import { sendError,sendSuccess } from "./utils/response.js"
import {notFound} from "./middlewares/notFound.js"



const server = http.createServer((req, res) => {
    const {method} = req
    const url = new URL(req.url, 'http://localhost')

    if (method === "GET" && url.pathname === "/health"){
        return sendSuccess(res, 200,"Hello to healthy server")
    }
    return notFound(res)

})

server.listen(3000, () => {
    console.log("Welcome to superheros server")
})