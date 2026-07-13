import { readJsonFile, writeJsonFile } from "../utils/fileSystem.js"

const ORDERS_FILE = "orders.json"

export const readOrders = async () => {
    return await readJsonFile(ORDERS_FILE)
}

export const writeOrders = async (orders) => {
    await writeJsonFile(ORDERS_FILE, orders)
}