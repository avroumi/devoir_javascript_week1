import {
    validName, isIntegrer, validType, settingslistClient,

} from "./service.js"


export const clientServices = settingslistClient()
export const showCustomers = () => clientServices.showCustomers()


const createId = () => {
    let id = 0
    return () => ++id
}

const getId = createId()

export const createAccount = (fullname, accountType, balance) => {
    const validAccountName = validName(fullname)
    if (!validAccountName) {
        return `Name cant be empty`
    }

    const validIntegrer = isIntegrer(balance)
    if (!validIntegrer) {
        return `Balance must be a positive integrer`
    }

    const ValidAccountType = validType(accountType.trim())
    if (!ValidAccountType) {
        return "TypeAccount must be in this list [regular, premium, student]"
    }

    return {
        id: getId(),
        fullname,
        accountType,
        balance,
        isActive: true
    }
}




export const deposit = (customerID, amount) => {
    const existCustomerId = clientServices.getCustomerById(customerID)
    if (!existCustomerId) {
        return `This customer ${customerID} dosen't exist`
        const activeCustomer = clientServices.isActive(customerID)
    }
    const activeCustomer = existCustomerId.isActive
    if (!activeCustomer) {
        return `this customer ${customerID} not active`
    }

    const validamountDeposit = isIntegrer(amount)

    if (!validamountDeposit) {
        return `Amount ${amount} must be a positive integrer`
    }

    let newBalance = existCustomerId.balance + amount
    const newData = { balance: newBalance }
    const client = clientServices.updateClient(customerID, newData)

    return
    `Deposit completed succesfully, new sold : ${newBalance}`
}

export const withdraw = (customerID, amount) => {
    const existCustomerId = clientServices.getCustomerById(customerID)
    if (!existCustomerId) {
        return `This customer ${customerID} dosen't exist`
        const activeCustomer = clientServices.isActive(customerID)
    }
    const activeCustomer = existCustomerId.isActive
    if (!activeCustomer) {
        return `this customer ${customerID} not active`
    }

    const validamountDeposit = isIntegrer(amount)

    if (!validamountDeposit) {
        return `Amount ${amount} must be a positive integrer`
    }

    const asEnoughMoney = existCustomerId.balance - amount
    if (asEnoughMoney < 0) {
        return Withdraw`failed: insufficient balance : ${asEnoughMoney}`
    }

    const newData = { balance: asEnoughMoney }
    const client = clientServices.updateClient(customerID, newData)

    return
    `Whidraw completed succesfully, new sold : ${asEnoughMoney}`
}

export const searchCustomer = (clientID = undefined, customerName = undefined) => {
    if (clientID !== undefined) return clientServices.getCustomerById(clientID)
    else if (customerName !== undefined) return clientServices.searchByName(customerName)
    else return undefined

}


export const closeAccount = (clientId) => {


    const client = clientServices.getCustomerById(clientId)
    if (!client) {
        return `This customer ${clientId} dosen't exist`
    }

    const deactivateData = { isActive: false }
    client.isActive = false

    return `Account closed ${clientId} successfuly`

}

export const showStatistics = () => {
    const customer = showCustomers()
    const totalCustomers = customer.length
    const activeAccounts = customer.filter(client => client.isActive === true)
        .length
    const totalMoney = customer.reduce((acc, curr) => acc + curr.balance, 0)
    const averageBalance = totalCustomers === 0 ? 0 : totalMoney / totalCustomers
    const highestBalance = totalCustomers === 0 ? 0 : Math.max(...customer.map(client => client.balance))


    return `============Satistics============
    totalCustomers: ${totalCustomers},
        activeAccounts : ${activeAccounts},
            totalMoney : ${totalMoney},
                averageBalance : ${averageBalance},
                    highestBalance : ${highestBalance}`

}
