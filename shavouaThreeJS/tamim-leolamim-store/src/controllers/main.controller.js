import { sendError,sendSuccess } from "../utils/responses.js";

export const getHome = (req,res) => {
    sendSuccess(res , {
        message:
    "Welcome to Tamim Leolamim Store API"})

}
 

export const getHealt = (req, res) => {
    sendSuccess(res ,{status: "OK"})

}