import { readCustomers, writeCustomers } from "../repositories/customers.repository.js"
import { startingBalance } from "../config/env.js"

export const getOrCreateCustomer = async (customerId) => {
    const customers = await readCustomers()

    let customer = customers.find(customer => customer.customerId === customerId)

    if (!customer) {
        customer = {
            customerId,
            balance: startingBalance,
            cart: [],
            createdAt: new Date().toISOString()
        }

        customers.push(customer)
        await writeCustomers(customers)
    }

    return customer
}

export const saveCustomer = async (updatedCustomer) => {
    const customers = await readCustomers()

    const customerIndex = customers.findIndex(
        customer => customer.customerId === updatedCustomer.customerId
    )

    if (customerIndex === -1) {
        customers.push(updatedCustomer)
    } else {
        customers[customerIndex] = updatedCustomer
    }

    await writeCustomers(customers)

    return updatedCustomer
}