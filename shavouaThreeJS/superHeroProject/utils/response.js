

export const sendSuccess = (res, statusCode, data) => {
    res.statusCode = statusCode
    res.setHeader("Content-Type", "application/json")
    const body = JSON.stringify({
        success : true,
        data : data
    })
    return res.end(body)
    
}
export const sendError = (res, errorCode , data) => {
    res.statusCode = errorCode
    res.setHeader("Content-Type", "application/json")
    const body = JSON.stringify({
        success : false,
        message : data
    })
    return res.end(body)
}