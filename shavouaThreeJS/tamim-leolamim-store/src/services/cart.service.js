import AppError from "../utils/AppError.js"
import { readProducts } from "../repositories/products.repository.js"
import { getOrCreateCustomer, saveCustomer } from "./customers.service.js"

export const getCustomerCart = async (customerId) => {
    const customer = await getOrCreateCustomer(customerId)
    const products = await readProducts()

    const items = customer.cart.map(cartitem => {
        const product = products.find(product => product.id === cartitem.productId)
        return {
            productId: cartitem.productId,
            name: product?.name || "Unknow product",
            price: product?.price || 0,
            quantity: cartitem.quantity,
            subtotal: product ? product.price * cartitem.quantity : 0

        }
    })

    const total = items.reduce((sum, item) => sum + item.subtotal,0)
    return {
        customerId,
        items,
        total
    }
}

export const addItemToCart = async ({customerId, productId, quantity}) => {
    const customer = await getOrCreateCustomer(customerId)
    const products = await readProducts()

    const product = products.find(item => item.id === productId)
    if (!product){
        throw new AppError("product not found ", 404)
    }

    const existingItem = customer.cart.find(item => item.productId === productId)
    const currentQuantityInCart = existingItem ? existingItem.quantity : 0 
    const requestedTotalQuantity = currentQuantityInCart + quantity

    if (product.stock < requestedTotalQuantity){
        throw new AppError("not enhough quantity" ,400
        )

    }

    if (existingItem){
        existingItem.quantity += quantity
    }else{
        customer.cart.push({
            productId,
            quantity
        })
    }

    await saveCustomer(customer)
    return await getCustomerCart(customerId)
}

export const removeItemFromCart = async (customerId, productId) => {
    const customer = await getOrCreateCustomer(customerId)

    const itemExists = customer.cart.some(item => item.productId === productId)

    if (!itemExists){
        throw new AppError("Products not found in cart ", 404)

    }

    customer.cart = customer.cart.filter(item => item.productId !== productId)

    await saveCustomer(customer)
    return await getCustomerCart(customerId)
}