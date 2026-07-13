import AppError from "../utils/AppError.js"
import { readProducts, writeProducts } from "../repositories/products.repository.js"
import { readOrders, writeOrders } from "../repositories/orders.repositories.js"
import { getOrCreateCustomer, saveCustomer } from "./customers.service.js"

export const checkoutCustomerCart = async (customerId) => {
    const customer = await getOrCreateCustomer(customerId)

    if (customer.cart.length === 0) {
        throw new AppError("Cart is empty", 400)
    }

    const products = await readProducts()
    const orders = await readOrders()

    const orderItems = customer.cart.map(cartItem => {
        const product = products.find(product => product.id === cartItem.productId)

        if (!product) {
            throw new AppError("One product in the cart no longer exists", 400)
        }

        if (product.stock < cartItem.quantity) {
            throw new AppError(`Not enough stock for ${product.name}`, 400)
        }

        return {
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: cartItem.quantity,
            subtotal: product.price * cartItem.quantity
        }
    })

    const total = orderItems.reduce((sum, item) => sum + item.subtotal, 0)

    if (customer.balance < total) {
        throw new AppError("Not enough balance", 400)
    }

    for (const item of orderItems) {
        const product = products.find(product => product.id === item.productId)
        product.stock -= item.quantity
    }

    customer.balance -= total
    customer.cart = []

    const newOrder = {
        id: orders.length > 0 ? Math.max(...orders.map(order => order.id)) + 1 : 1,
        customerId,
        items: orderItems,
        total,
        createdAt: new Date().toISOString()
    }

    orders.push(newOrder)

    await writeProducts(products)
    await saveCustomer(customer)
    await writeOrders(orders)

    return newOrder
}

export const getCustomerOrders = async (customerId) => {
    const orders = await readOrders()

    return orders.filter(order => order.customerId === customerId)
}