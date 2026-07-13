import {
    getCustomerCart,
    addItemToCart,
    removeItemFromCart
} from "../services/cart.service.js"
import { sendSuccess } from "../utils/response.js"

export const getCart = async (req, res) => {
    const {customerId} = req.query

    const cart = await getCustomerCart(customerId)

    sendSuccess(res, cart)
}

export const addCarItem = async (req, res) => {
    const cart = await addItemToCart(req.body)

    sendSuccess(res, cart)
}

export const deleteCartItem = async (req, res) => {
    const {customerId} = req.body
    const {productId} = req

    const cart = await removeItemFromCart(customerId,productId)

    sendSuccess(res,cart)
}