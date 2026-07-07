

export const sendSuccess = (res, statusCode, data, meta = null) => {
    res.statusCode = statusCode
    res.setHeader("Content-Type", "application/json")
    const response = {
        success : true,
        data : data
    }

    if (meta !== null)(
        response.meta = meta
    )
    const body = JSON.stringify(response)
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