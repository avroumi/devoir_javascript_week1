import express from "express"
import {getAllorders,
    getOrderById, 
    createOrder,
    updateOrder,
    deleteOrder,
    updateOrderSatus
} from "../controllers/ordersController.js"
import { checkId } from "../middlewares/checkId.js"


const router = express.Router()

router.get("/", getAllorders)

router.get("/:id", checkId, getOrderById)

router.post("/", createOrder)

router.put("/:id", checkId, updateOrder)

router.delete("/:id",checkId, deleteOrder)

router.patch("/:id", checkId, updateOrderSatus)

export default router

