import { getAllHeroes, getHeroesById, 
    updateHero, deleteHero, createHero } from "../services/heroes.service.js";
import { parseBody } from "../utils/parseBody.js";
import { sendError,sendSuccess } from "../utils/response.js";
import { filterHeroesByQuery } from "../services/search.service.js";

export const handleHeroesRoutes = async (req, res, url) => {
    const {method} = req
    const pathname = url.pathname
    
    try{
        if (method === "GET" && pathname === "/heroes") {
            
            const query = Object.fromEntries(url.searchParams.entries())
            const heroes = await getAllHeroes()

            const result = filterHeroesByQuery(heroes, query)

            sendSuccess(res, 200, result.data, result.meta)
            return true
        }
        if (method === "POST" && pathname === "/heroes"){
            const body = await parseBody(req)
            const newHero = await createHero(body)
            sendSuccess(res, 201, newHero)
            return true 
        }

        const parts = pathname.split("/").filter(Boolean)

        if (method === "GET" && parts[0] === "heroes" && parts[1] && parts.length === 2){
            const hero = await getHeroesById(parts[1])
            sendSuccess(res, 200, hero)
            return true 
        }

        if (method === "PATCH" && parts[0] === "heroes" && parts[1] && parts.length === 2){
            const body = await parseBody(req)
            const updatedHero = await updateHero(parts[1], body)
            sendSuccess(res , 200 , updatedHero)
            return true
        }
        if (method === "DELETE" && parts[0] === "heroes" && parts[1] && parts.length === 2){
            const deletedHero = await deleteHero(parts[1])
            sendSuccess(res, 200, deletedHero)
            return true
        }
        return false

    }catch(error) {
        const statusCode = error.statusCode || 500
        const message = error.message || "Internal server error"

        sendError(res, statusCode, message)
        return true 
    }
}