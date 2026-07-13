import express from "express"
import { getProducts } from "../controllers/products.controller.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const router = express.Router()

router.get("/", asyncHandler(getProducts))

export default router