import http from "http"
import {URL} from "url"
import { sendError,sendSuccess } from "./utils/response.js"
import {notFound} from "./middlewares/notFound.js"
import { handleHeroesRoutes } from "./routes/heroes.routes.js"



const server = http.createServer(async (req, res) => {
    const {method} = req
    const url = new URL(req.url, 'http://localhost')

    if (method === "GET" && url.pathname === "/health"){
        return sendSuccess(res, 200,"Hello to healthy server")
    }
    const handledHeroes = await handleHeroesRoutes(req, res, url)
    if (handledHeroes){
        return 
    }
    return notFound(res)

})

server.listen(3000, () => {
    console.log("Welcome to superheros server")
})