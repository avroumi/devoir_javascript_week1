


export const validName = name => name.length > 1

export const isIntegrer = number => typeof number === "number" && number > 0


export const validType = type => {
    const valid = ["regular", "premium", "student"]
    return valid.includes(type.toLowerCase())
}

export const settingslistClient = () => {
    const listClient = []
    const addClient = client => listClient.push(client)

    const showCustomers = () => listClient

    const getCustomerById = id => listClient.find(client => client.id == id)

    const updateClient = (clientId, newData) => {
        const client = getCustomerById(clientId)

        if (!client) {
            return `Customer ${clientId} not found `
        }

        Object.assign(client, newData)

        return client
    }
    const isActive = id => {

        return listClients.some(client => client.id === id && client.isActive === true)

    }
    const searchByName = (name) => listClient.filter(client =>
        client.fullname
            .toLowerCase()
            .includes(name.toLowerCase())
    )


    return {
        addClient,
        showCustomers,
        getCustomerById,
        updateClient,
        isActive,
        searchByName
    }
}









