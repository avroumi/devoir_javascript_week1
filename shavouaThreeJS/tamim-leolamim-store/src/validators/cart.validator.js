import AppError from "../utils/AppError.js"

export const validateAddCartItemBody = (req,res,next) => {
    const {customerId, productId, quantity} = req.body

    if (!customerId || productId === undefined || quantity === undefined){
        return next(new AppError("customerId , productId and quantity are required", 400))
    
    }

    const numProductId = Number(productId)
    const numQuantity = Number(quantity)

    if (!Number.isInteger(numericProductId)) {
        return next(new AppError("productId must be an integer", 400))
    }

    if (!Number.isInteger(numericQuantity) || numericQuantity <= 0) {
        return next(new AppError("quantity must be an integer greater than 0", 400))
    }

    req.body.productId = numProductId
    req.body.quantity = numQuantity
    next()
}

export const validateRemoveCartItem = (req, res, next) => {
    const {customerId} = req.body
    const productId = Number(req.params.productId)
    if (!customerId) {
        return next(new AppError("customerId is required", 400))
    }

    if (!Number.isInteger(productId)) {
        return next(new AppError("productId must be an integer", 400))
    }

    req.productId = productId

    next()
}