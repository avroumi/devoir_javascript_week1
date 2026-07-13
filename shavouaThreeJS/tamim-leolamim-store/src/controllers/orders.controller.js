import { checkoutCustomerCart, getCustomerOrders } from "../services/orders.service.js"
import { sendSuccess } from "../utils/responses.js"

export const checkout = async (req, res) => {
    const { customerId } = req.body

    const order = await checkoutCustomerCart(customerId)

    sendSuccess(res, order)
}

export const getOrders = async (req, res) => {
    const { customerId } = req.query

    const orders = await getCustomerOrders(customerId)

    sendSuccess(res, {
        orders
    })
}