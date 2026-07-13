import { getAllProducts } from "../services/products.service.js"
import { sendSuccess } from "../utils/response.js"

export const getProducts = async (req, res) => {
    const products = await getAllProducts(req.query)

    sendSuccess(res, {
        products
    })
}