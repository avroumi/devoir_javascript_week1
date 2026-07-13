import AppError from "../utils/AppError.js"

export const validateCheckoutBody = (req, res, next) => {
    const { customerId } = req.body

    if (!customerId) {
        return next(new AppError("customerId is required", 400))
    }

    next()
}