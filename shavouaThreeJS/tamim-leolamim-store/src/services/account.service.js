import { getOrCreateCustomer } from "./customers.service.js"

export const getCustomerBalance = async (customerId) => {
    const customer = await getOrCreateCustomer(customerId)

    return {
        customerId: customer.customerId,
        balance: customer.balance
    }
}