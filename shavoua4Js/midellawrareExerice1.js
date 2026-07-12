import express from "express"

//1 

// Is a function with run before server and can exploit validation and verifivation , 
// the goal is not to repeat code 

//2

// request , response and next 
//  request is request for the user , and reponse what reponse client recept 
// you can play with this parameter for modify any step 
//  next it like continue for the basic function 

//3 

// is not continue , you not use next if you want to stop the process like throw error 

//4

// the fist one logg with any routes , the second and third in speciifc routes

//5

// is recup the body and parsing it , if you don't use it the  body is undefined 

//6

function logger(req, res, next ){
    console.log(req.method , req.url )
    next()
}

// 7
app.use(express.json())

//8
function auth(req, res , next){
    const token = req.headers.authorization?.split(" ")[1]
    if (!token){
        return res.status(401).json({message : "Token not exist"})
    }
    next()
}

//9

// 1 : Home  2: Token not exist 3: Data 

// 10 
// go next before res.status(403)

// 11
function requestTimer(req,res,next){
    req.startTime = new Date.now()
    next()
}

// 12
const app = express()
app.use(express.json())

function logger(req,res,next){
    console.log(req.method, req.url)
    next()
}
function auth(req, res ,next){
    const token = req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.status(403).json({message : "token not found "})
    }
    next()
}   

app.use("/", logger)

app.get("/public", (req, res) => {
    res.json({message : "Public"})
})

app.get("/private", auth , (req,res) => {
    res.json({message : "Secret"})
})

app.listen(3000 , () => console.log("welcome in port 3000")
)