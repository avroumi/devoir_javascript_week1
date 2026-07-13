import AppError from "../utils/AppError.js"

export const requireCustomerIdQuery = (req, res, next) => {
    const {customerId} = req.query

    if (!customerId){
        return next(new AppError("customer is required", 400))
    }
    next()
}