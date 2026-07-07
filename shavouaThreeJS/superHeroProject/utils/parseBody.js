
export const parseBody = req => {
    return new Promise((res, rej) => {
        let body = ""
    req.on("data", (chunk) => {
        body += chunk.toString()
    })
    req.on("end",() => {
        if (body.trim() === ""){
            return res({})
        }
        try{
            const parsedBody = JSON.parse(body)
            return res(parsedBody)
        } catch(error){
            const jsonError = new Error("Invalid JSON body")
            jsonError.statusCode = 400
            return rej(jsonError)
        }
    })
    req.on("error",  () => {
        const error = new Error("Error while reading request body")
        error.statusCode = 500
        return rej(error)
    })
})
}