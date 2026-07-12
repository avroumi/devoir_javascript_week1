import express from "express"

const app = express()

//1
function midllewareTime (req , res , next ) {
    req.requestTime = new Date().toISOString()
    next()
}



//2 

app.get("/time", midllewareTime , (req, res) => {
    res.end(`Request received at ${req.requestTime}`)
})

//3

app.use(express.json())

function midllewareBody (req, res , next ){
    if (req.method === "POST"){
        if (!req.body || Object.keys(req.body).length === 0){
            return res.status(400).json({error : "Body cannot be empty"})
        }
    }
    next()
}



//4

app.post("/data", midllewareBody, (req, res)=> {
    res.end("Data receved")
})


//6

function adminMiddleware(req, res, next){
    if (req.query.admin !== "true"){
        return res.status(403).json({
            message : "Forbidden : Admins only"
        })
    }

}


//9

function errorHandler(err, req, res, next){
    res.json({
        error: true , 
        message : err.message
    })
}

//13

function jsonMiddelware(res, req, next){
    if (!req.is("application/json")){
        res.status(415).json({
            error : "Header not apllication/json "
        })
    }next()
}

//14

function isValidNumberMiddleware(req,res, next){
    const age = Number(req.params.age)
    if (!Number.isInteger(age)){
        return res.status(400).json({
            error : "INvalide age"
        })
    }next()
}

//26

function tokenMiddelware(req, res, next ){
    const token = req.headers.authorization?.split(" ")[1]
    if (token !== "secret123"){
        return res.status(400).json({
            error : "Unauthorized : INvalid token "
        })
    }next()
}

app.listen(3001, () => console.log("WElcome to 3001"))