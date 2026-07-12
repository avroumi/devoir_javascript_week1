
import fs from "fs/promises"

const filePath = new URL("../data/orders.json", import.meta.url)

const allowedSatuses = ["NEW", "PREPARING", "READY", "DELIVERED", "CANCELLED"]

const allowedTransitions = {
    NEW : ["PREPARING", "CANCELLED"],
    PREPARING : ["READY", "CANCELLED"],
    READY : ["DELIVERED"],
    DELIVERED : [],
    CANCELLED : []
}

function createError(status, message){
    return {status , message}
}

async function readOrders(){
    try{
        const data = await fs.readFile(filePath,"utf-8")
        return JSON.parse(data)
    }catch{
        throw createError(500, "File read error")
    }
}

async function writeOrders(orders){
    try {
        await fs.writeFile(filePath, JSON.stringify(orders, null , 2))

    }catch {
        throw createError(500, "File write error")
    }
}

export async function getAllordersService(query){
    let orders = await readOrders()

    if (query.status){
        orders = orders.filter(order => order.status === query.status)
    }
    if (query.customers){
        orders = orders.filter(order => order.customers === query.customers)
    }
    if (query.table){
        orders = orders.filter(order => String(order.table) === String(query.table))
    }
    return  orders 
}

export async function getOrderByIdService(id){
    const orders = await readOrders()
    const order = orders.find(order => order.id === Number(id))
    if (!order){
        throw createError(404, "Order not found")
    }
    return order
}

export async function createOrderService(data){
    const {customer, table , items} = data 

    if ((!customer || !table || !items)){
        throw createError(400, "Missing required fields")
    }

    const orders = await readOrders()
    const newOrder = {
        id : orders.length > 0 ? orders[order.length -1 ].id +1 : 1 ,
        customer, 
        items,
        table ,
        status : "NEW",
        createdAt : new Date().toISOString()
    }

    orders.push(newOrder)
    await writeOrders(orders)

    return newOrder
}

export async function updateOrderService(id, data){
    const {customer , table , items , status} = data

    if (!customer || !table || !items || !status){
        throw createError(400, "Missing requirind fields")
    }
    if (!allowedSatuses.includes(status)){
        throw createError(400, "Invalid Status")
    }

    const orders = await readOrders()
    const index = orders.findIndex(order => order.id === Number(id))

    if (index === -1 ){
        throw createError(404, "Order not found")
    }

    orders[index] ={
        ...orders[index], 
        customer, 
        table, 
        items, 
        status
    }

    await writeOrders(orders)
    return orders[index]
}

export async function deleteOrderService(id){
    const orders = await readOrders()
    const index = orders.findIndex(order => order.id === Number(id))

    if (index === -1 ){
        throw createError(404, "Order not fond")
    }
    const deleteOrder = orders.splice(index,1)[0]

    await writeOrders(orders)

    return deleteOrder

}

export async function updateStatusService(id , newStatus){
    if (!allowedSatuses.includes(newStatus)){
        throw createError(400, "Invalid status")
    }

    const orders = await readOrders()
    const order = orders.find(order => order.id === Number(id))

    if (!order){
        throw createError(404, "Order not found")
    }

    const possibleNextStatuses = allowedTransitions[order.status]

    if (!possibleNextStatuses.includes(newStatus)){
        throw createError(400, "Invalid status transition")
    }

    order.status = newStatus
    
    await writeOrders(orders)
    return order 

}