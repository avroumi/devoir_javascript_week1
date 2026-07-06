import { readHeroes, writeHeroes} from "../data/heroesData.js";

export const getAllHeroes = async () => {
    const allHeroes = await readHeroes()
    return allHeroes
}

export const getHeroesById = async (id) => {
    const numId = Number(id)
    const heroes = await readHeroes()
    const heroeById = heroes.find(heroe => heroe.id === numId)
    if (!heroeById){
        throw new Error("404 not found")
    }
    return heroeById
}

import { readHeroes, writeHeroes } from "../data/heroesData.js"

const VALID_STATUSES = ["active", "retired", "missing", "deceased"]

const createError = (statusCode, message) => {
    const error = new Error(message)
    error.statusCode = statusCode
    return error
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