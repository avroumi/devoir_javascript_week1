import express from "express"
import { getHealt,getHome } from "../controllers/main.controller.js"

const router = express.Router()

router.get("/", getHome)
router.get("/health", getHealt)

export default router 