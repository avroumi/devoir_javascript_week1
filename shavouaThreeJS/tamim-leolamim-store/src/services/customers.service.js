import { readCustomers,writeCustomers } from "../repositories/customers.repository.js";
import { startingBalance } from "../config/env.js";

export const getOrCreateCustomer = async (customerId) => {
    const customers = await readCustomers()

    let customer = customers.find(customer => customer.customerId === customerId)

    if (!customer) {
        customer = {
            customerId,
            balance : startingBalance,
            cart: [],
            createdAt : new Date().toISOString() 
        }
    }
    customer.push(customer)
    await writeCustomers(customers)

    return customer
}

export const saveCustomer = async (upadatedCustomer) => {
    const customers = await readCustomers()

    const customerIndex = customers.findIndex(
        customer => customer.customerId === upadatedCustomer.customerId
    )

    if (customerIndex === 1 ){
        customers.push(upadatedCustomer)
    }else{
        customers[customerIndex] = upadatedCustomer
    }

    await writeCustomers(customers)

    return upadatedCustomer
}