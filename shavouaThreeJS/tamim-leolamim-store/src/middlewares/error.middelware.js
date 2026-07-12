import { sendError } from "../utils/responses.js";

export const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal server error"

    sendError(res, message,statusCode)
}