import fs from "fs"

const FILE_PATH = "./data/movies.json"

/////callback

export const readFilecallback = (callback) => {
    fs.readFile(FILE_PATH, "utf8", (err,data) => {
        if (err){
            return callback(err)
        }

        callback(null, data)
    })
}

export const writeFileCallback = (content, cb) => {
    fs.writeFile(FILE_PATH, content, "utf8", (err) => {
        if (err){
            return cb(err)
        }
        cb(null)
    })
}

/////promises

export const readMovies = () => {
    return new Promise((res, rej) => {
        readFilecallback((err, data ) => {
            if (err) {
                return rej(err)
            }
            try{
                const movies = JSON.parse(data)
                res(movies)
            }catch (err){
                rej(err)
            }
        })
    })
}

export const wrietMovies = movies => {
    return new Promise((res, rej) => {
        try{
            const content = JSON.stringify(movies, null , 2)

            writeFileCallback(content, (err) => {
                if (err) {
                    return rej(err)
                }

                res()
            })
        }catch (err){
            rej(err)
        }
    }
    )
}