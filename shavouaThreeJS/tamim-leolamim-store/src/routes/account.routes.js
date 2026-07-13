import express from "express"
import { getBalance } from "../controllers/account.controller.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { requireCustomerIdQuery } from "../middlewares/requireCustomerIdQuery.middleware.js"

const router = express.Router()

router.get("/balance", requireCustomerIdQuery, asyncHandler(getBalance))

export default router