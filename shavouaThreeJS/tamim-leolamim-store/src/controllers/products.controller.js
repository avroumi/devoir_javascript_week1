import { getAllProducts } from "../services/products.service.js"
import { sendSuccess } from "../utils/responses.js"

export const getProducts = async (req, res) => {
    const products = await getAllProducts(req.query)

    sendSuccess(res, {
        products
    })
}