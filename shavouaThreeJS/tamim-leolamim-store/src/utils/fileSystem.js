import {readFile, writeFile} from "fs/promises"
import path from "path"
import {dbBasePath} from "../config/env.js"




const getFilePath = (fileName) => {
    return path.resolve(dbBasePath, fileName)
}

export const readJsonFile = async (fileName) => {
    const filePath = getFilePath(fileName)
    const data = await readFile(filePath, "utf-8")
    return JSON.parse(data)
}

export const writeJsonFile = async (fileName, data) => {
    const filePath = getFilePath(fileName)
    await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8")
}