import { readJsonFile, writeJsonFile } from "../utils/fileSystem.js"

const CUSTOMERS_FILE = "customers.json"

export const readCustomers = async () => {
    return await readJsonFile(CUSTOMERS_FILE)
}

export const writeCustomers = async (customers) => {
    await writeJsonFile(CUSTOMERS_FILE, customers)
}