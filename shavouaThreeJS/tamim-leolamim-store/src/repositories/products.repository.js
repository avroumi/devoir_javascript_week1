import { readJsonFile, writeJsonFile } from "../utils/fileSystem.js"

const PRODUCTS_FILE = "products.json"

export const readProducts = async () => {
    return await readJsonFile(PRODUCTS_FILE)
}

export const writeProducts = async (products) => {
    await writeJsonFile(PRODUCTS_FILE, products)
}