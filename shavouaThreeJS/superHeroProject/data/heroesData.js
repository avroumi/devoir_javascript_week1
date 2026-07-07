import fs from "fs/promises"

const FILE_PATH = "./data/heroes.json"

export const readHeroes = async () => {
    const res = await fs.readFile(FILE_PATH,"utf-8")
    const data = JSON.parse(res)
    return  data
}

export const writeHeroes = async (data) => {
    
    const jsonData = JSON.stringify(data, null , 2)
    await fs.writeFile(FILE_PATH, jsonData, "utf-8")
    return {message : "Write succesfully"}
    
}

