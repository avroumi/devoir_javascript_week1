import express from "express"
import { checkout, getOrders } from "../controllers/orders.controller.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { requireCustomerIdQuery } from "../middlewares/requireCustomerIdQuery.middleware.js"
import { validateCheckoutBody } from "../validators/orders.validator.js"

const router = express.Router()

router.post("/checkout", validateCheckoutBody, asyncHandler(checkout))

router.get("/", requireCustomerIdQuery, asyncHandler(getOrders))

export default router