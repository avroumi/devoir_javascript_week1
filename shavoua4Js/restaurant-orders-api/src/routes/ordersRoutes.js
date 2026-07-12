import express from "express"
import {getAllorders,
    getOrderById, 
    createOrder,
    updateOrder,
    deleteOrder,
    updateOrderSatus
} from "../controllers/ordersController.js"

const router = express.Router()

router.get("/", getAllorders)
router.get("/:id", getOrderById)
router.post("/", createOrder)
router.put("/:id", updateOrder)
router.delete("/:id", deleteOrder)
router.patch("/:id", updateOrderSatus)

export default router

