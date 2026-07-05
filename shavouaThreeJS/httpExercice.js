import http from "http"

const server = http.createServer((req, res) => {
   
    res.end("hello from my server")

})

// server.listen(3000, () => {
//     console.log("running in server 3000")
// })

//exercice2

const server2 = http.createServer((req , res) => {
    res.setHeader("Content-Type", "text/plain")
    if (req.url === "/"){
        res.end("hello to home page")
    }else if (req.url === "/about"){
        res.end("welcome to about page")
    }else if (req.url === "/contact"){
        res.end("welcome to contact page")
    }else {
        res.statusCode = 404
        res.end("404 not Found")}
})

server2.listen(3001,() => console.log("welcome to 3001"))

//exercice3

const server3 = http.createServer((req, res) => {
    if (req.method !== "GET" && req.method !== "POST"){
        res.end("Method not allowed")
    }
    else if (req.url === "/users" && req.method === "GET"){
        res.end("Users list")
    }else if (req.url === "/users" && req.method === "POST"){
        res.end("user created")
    }else {res.end("404 path not found")}
})

server3.listen(3002 , () => console.log("hello in port 3002"))