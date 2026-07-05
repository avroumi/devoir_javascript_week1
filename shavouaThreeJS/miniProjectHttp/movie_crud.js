import http from "http"

let movies = []
let nextID = 1

const sendJson = (res, statusCode, data) => {
    res.statusCode = statusCode
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify(data))
}

const server = http.createServer((req, res) => {
    if (req.url !== "/movies") {
        return sendJson(res, 404, {
            message: "Route not found"
        })
    }

    if (req.method === "GET") {
        return sendJson(res, 200, movies)
    }

    if (req.method === "POST") {
        let body = ""

        req.on("data", (chunk) => {
            body += chunk
        })

        req.on("end", () => {
            try {
                const data = JSON.parse(body)

                data.id = nextID
                nextID++

                movies.push(data)

                return sendJson(res, 201, {
                    message: "Movie created successfully",
                    movie: data
                })
            } catch (error) {
                return sendJson(res, 400, {
                    message: "Invalid JSON"
                })
            }
        })

        return
    }

    if (req.method === "PUT") {
        let body = ""

        req.on("data", (chunk) => {
            body += chunk
        })

        req.on("end", () => {
            try {
                const bodyJson = JSON.parse(body)

                const movie = movies.find(movie => movie.id === bodyJson.id)

                if (!movie) {
                    return sendJson(res, 404, {
                        message: "Movie not found"
                    })
                }

                movie.title = bodyJson.title
                movie.director = bodyJson.director

                return sendJson(res, 200, {
                    message: "Movie updated successfully",
                    movie: movie
                })
            } catch (error) {
                return sendJson(res, 400, {
                    message: "Invalid JSON"
                })
            }
        })

        return
    }

    if (req.method === "DELETE") {
        let body = ""

        req.on("data", (chunk) => {
            body += chunk
        })

        req.on("end", () => {
            try {
                const bodyJson = JSON.parse(body)

                const index = movies.findIndex(movie => movie.id === bodyJson.id)

                if (index === -1) {
                    return sendJson(res, 404, {
                        message: "Movie not found"
                    })
                }

                movies.splice(index, 1)

                return sendJson(res, 200, {
                    message: "Movie deleted"
                })

            } catch (error) {
                return sendJson(res, 400, {
                    message: "Invalid JSON"
                })
            }
        })

        return
    }

    return sendJson(res, 405, {
        message: "Method not allowed"
    })
})

server.listen(3000, () => {
    console.log("hello from 3000")
})