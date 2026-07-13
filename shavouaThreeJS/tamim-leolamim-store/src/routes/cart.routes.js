import express from "express"
import { getCart, addCartItem, deleteCartItem } from "../controllers/cart.controller.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { requireCustomerIdQuery } from "../middlewares/requireCustomerIdQuery.middleware.js"
import { validateAddCartItemBody, validateRemoveCartItem } from "../validators/cart.validator.js"

const router = express.Router()

router.get("/", requireCustomerIdQuery, asyncHandler(getCart))

router.post("/items", validateAddCartItemBody, asyncHandler(addCartItem))

router.delete("/items/:productId", validateRemoveCartItem, asyncHandler(deleteCartItem))

export default router