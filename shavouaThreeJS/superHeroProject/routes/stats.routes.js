import { getHeroesStats } from "../services/stats.service.js";
import { sendError,sendSuccess } from "../utils/response.js";

export const handleStatsRoutes = async (req,res, url) => {
    const {method} = req
    const pathname = url.pathname

    try{
        if (method === "GET" && pathname === "/stats") {
            const stats = await getHeroesStats()
            sendSuccess(res, 200, stats)
            return true 
        }
        return false
    }
    catch(error){
        const statusCode = error.statusCode || 500
        const message = error.message || "Internal server error"

        sendError(res, statusCode, message)
        return true
    }
}