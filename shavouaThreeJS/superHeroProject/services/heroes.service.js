import { fstat } from "fs";
import { readHeroes, writeHeroes} from "../data/heroesData.js";




const VALID_STATUSES = ["active", "retired", "missing", "deceased"]

const createError = (statusCode, message) => {
    const error = new Error(message)
    error.statusCode = statusCode
    return error
}



export const getAllHeroes = async () => {
    const allHeroes = await readHeroes()
    return allHeroes
}

export const getHeroesById = async (id) => {
    const numId = Number(id)
    const heroes = await readHeroes()
    const heroeById = heroes.find(heroe => heroe.id === numId)
    if (!heroeById){
        throw createError(404, "Hero not found")
    }
    return heroeById
}




export const createHero = async (heroData) => {
    const requiredFields = ["codeName", "powers", "threatLevel"]

    for (const field of requiredFields) {
        if (heroData[field] === undefined || heroData[field] === null) {
            throw createError(400, `${field} is required`)
        }
    }

    if (typeof heroData.codeName !== "string" || heroData.codeName.trim() === "") {
        throw createError(400, "codeName must be a non-empty string")
    }

    if (!Array.isArray(heroData.powers) || heroData.powers.length === 0) {
        throw createError(400, "powers must be a non-empty array")
    }

    for (const power of heroData.powers) {
        if (typeof power !== "string" || power.trim() === "") {
            throw createError(400, "each power must be a non-empty string")
        }
    }

    if (
        !Number.isInteger(heroData.threatLevel) ||
        heroData.threatLevel < 1 ||
        heroData.threatLevel > 10
    ) {
        throw createError(400, "threatLevel must be an integer between 1 and 10")
    }

    const status = heroData.status || "active"

    if (!VALID_STATUSES.includes(status)) {
        throw createError(400, "status must be active, retired, missing or deceased")
    }

    if (
        heroData.affiliations !== undefined &&
        !Array.isArray(heroData.affiliations)
    ) {
        throw createError(400, "affiliations must be an array")
    }

    const heroes = await readHeroes()

    const cleanCodeName = heroData.codeName.trim()

    const codeNameExists = heroes.some(
        hero => hero.codeName.toLowerCase() === cleanCodeName.toLowerCase()
    )

    if (codeNameExists) {
        throw createError(409, "codeName already exists")
    }

    const newId = heroes.length > 0
        ? Math.max(...heroes.map(hero => hero.id)) + 1
        : 1

    const now = new Date().toISOString()

    const newHero = {
        id: newId,
        codeName: cleanCodeName,
        powers: heroData.powers.map(power => power.trim()),
        threatLevel: heroData.threatLevel,
        status,
        origin: heroData.origin || "",
        affiliations: heroData.affiliations || [],
        firstSighting: heroData.firstSighting || "",
        notes: heroData.notes || "",
        createdAt: now,
        updatedAt: now
    }

    heroes.push(newHero)

    await writeHeroes(heroes)

    return newHero
}

export const updateHero = async (id, updateData) => {
    const heroes = await readHeroes()
    const numId = Number(id)

    const heroIndex = heroes.findIndex(hero => hero.id === numId)

    if (heroIndex === -1){
        throw createError(404 , "Hero not found")
    }

    if (updateData.id !== undefined){
        throw createError(400, "You can't change id")
    }
    if (updateData.createdAt !== undefined){
        throw createError(400, "you can't change date of creation")
    }
    if (updateData.codeName !== undefined){
        if (typeof updateData.codeName !== "string" || updateData.codeName.trim( ) === ""){
            throw createError(400, "you codeName can't be empty")}

            const sameCodeName = heroes.find(hero => hero.codeName === updateData.codeName.trim())

            if (sameCodeName && sameCodeName.id !== numId){
                throw createError(409, `you can defined this codename , is already use by hero ${sameCodeName.id}`)
            }
        }


    if (updateData.powers !== undefined){
        if (!Array.isArray(updateData.powers) || updateData.powers.length === 0){
            throw createError(400, "Powers must be an array not empty")
        }
        for (const power of updateData.powers){
            if (typeof power !== "string" || power.trim() === ""){
                throw createError(400, "Powers must be not empty and arr of string")
            }
        }
    }

    if (updateData.threatLevel !== undefined){
        if (!Number.isInteger(updateData.threatLevel) || 
        updateData.threatLevel < 1 || updateData.threatLevel > 10 ){
            throw createError(400 , "threatLevel must be an integrer between 1 and 10")
        }
    }

    if (updateData.status !== undefined){
        if (!VALID_STATUSES.includes(updateData.status)){
            throw createError(400, `Status must be in the list ${VALID_STATUSES}`)
        }
    }

    if (updateData.affiliations !== undefined){
        if (!Array.isArray(updateData.affiliations)){
            throw createError(400, "affiliations must be array")
        }
    }

    const oldHero = heroes[heroIndex]

    const updatedHero = {
        ...oldHero,
        ...updateData,
        updatedAt : new Date().toISOString()
    }

    heroes[heroIndex] = updatedHero

    await writeHeroes(heroes)

    return updatedHero
} 

export const deleteHero = async id => {
    const heroes = await readHeroes()
    const numId = Number(id)
    const heroExists = await getHeroesById(numId)

    const updatedHeroes = heroes.filter(hero => hero.id !== numId)
    await writeHeroes(updatedHeroes)
    return {message : `Delete hero ${heroExists.codeName} sucessfully `}
}