import { sendError } from "../utils/response.js";



export const notFound = (res) => {
        return sendError(res, 404, "Routes not found")
    }
