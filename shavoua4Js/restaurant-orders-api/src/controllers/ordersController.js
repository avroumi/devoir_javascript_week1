import { getAllordersService,
    getOrderByIdService,
    createOrderService,
    updateOrderService,
    updateStatusService,
    deleteOrderService
 } from "../services/ordersService.js";

 export async function getAllorders(req,res,next) {
    try{
        const orders = await getAllordersService(req.query)
        res.json(orders)
    }catch(err){
        next(err)
    }
 }
 export async function getOrderById(req,res,next) {
    try{
        const orders = await getOrderByIdService(req.parmas.id)
        res.json(orders)
    }catch(err){
        next(err)
    }
 }
 export async function createOrder(req,res,next) {
    try{
        const Neworder = await createOrderService(req.body)
        res.status(201).json(Neworder)
    }catch(err){
        next(err)
    }
 }
 export async function updateOrder(req,res,next) {
    try{
        const updateOrder = await updateOrderService(req.params.id , req.body)
        res.json(updateOrder)
    }catch(err){
        next(err)
    }
 }
 export async function deleteOrder(req,res,next) {
    try{
        const deletedOrder = await deleteOrderService(req.params.id)
        res.json(deletedOrder)
    }catch(err){
        next(err)
    }
 }
 export async function updateOrderSatus(req,res,next) {
    try{
        const updateOrder = await updateStatusService(req.pararms.id, req.body.status)
        res.json(updateOrder)
    }catch(err){
        next(err)
    }
 }

