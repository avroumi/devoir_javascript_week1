import { readProducts } from "../repositories/products.repository.js";
import AppError from "../utils/AppError.js"

export const getAllProducts = async (filters) => {
    const {inStock, maxPrice,search} =filters

    let products = await readProducts()

    if (inStock !== undefined){
       if  (inStock !== "true" && inStock !== "false"){
    
        throw new AppError("inStock must be true or false", 400 )
       }
    if (inStock === "true"){
        products = products.filter(product=> product.stock > 0 )
    }
    
    } if (maxPrice !== undefined){
        const priceLimit = Number(maxPrice)

    if (Number.isNaN(priceLimit) || priceLimit < 0){
        throw new AppError("maxPrice must be a integrer anv positive number ", 400)
    }
    products = products.filter(product=> product.price <= priceLimit)
    }
    if (search !== undefined){
        const searchText  = search.toLowerCase()

        products = products.filter(product => product.name.toLowerCase().includes(searchText))
    }

    return products
}





export const getProductById = async (productId) => {
    const products = await readProducts()

    const product = products.find(product => product.id === productId)
    if (!product){
        throw new AppError("Product not found ", 404)
    }
    return product
}

