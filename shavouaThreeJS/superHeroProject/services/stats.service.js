import { readHeroes } from "../data/heroesData.js"

export const getHeroesStats = async () => {
    const heroes = await readHeroes()

    const totalHeroes = heroes.length

    if (totalHeroes === 0) {
        return {
            totalHeroes: 0,
            byStatus: {
                active: 0,
                retired: 0,
                missing: 0,
                deceased: 0
            },
            averageThreatLevel: 0,
            mostCommonPower: null,
            highestThreat: null,
            newestRecord: null
        }
    }

    const byStatus = heroes.reduce((acc, hero) => {
        acc[hero.status] = (acc[hero.status] || 0) + 1
        return acc
    }, {
        active: 0,
        retired: 0,
        missing: 0,
        deceased: 0
    })

    const totalThreatLevel = heroes.reduce((sum, hero) => {
        return sum + hero.threatLevel
    }, 0)

    const averageThreatLevel = totalThreatLevel / totalHeroes

    const powerCount = {}

    for (const hero of heroes) {
        for (const power of hero.powers) {
            powerCount[power] = (powerCount[power] || 0) + 1
        }
    }

    let mostCommonPower = null
    let maxPowerCount = 0

    for (const power in powerCount) {
        if (powerCount[power] > maxPowerCount) {
            maxPowerCount = powerCount[power]
            mostCommonPower = power
        }
    }

    const highestThreat = heroes.reduce((maxHero, hero) => {
        return hero.threatLevel > maxHero.threatLevel ? hero : maxHero
    }, heroes[0])

    const newestRecord = heroes.reduce((newest, hero) => {
        return new Date(hero.createdAt) > new Date(newest.createdAt)
            ? hero
            : newest
    }, heroes[0])

    return {
        totalHeroes,
        byStatus,
        averageThreatLevel,
        mostCommonPower,
        highestThreat,
        newestRecord
    }
}