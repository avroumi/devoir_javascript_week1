


export const filterHeroesByQuery =  (heroes, query) => {

    let filteredHeroes = heroes

    if (query.status){
        filteredHeroes = filteredHeroes.filter(hero => hero.status === query.status)   
    }
    if  (query.power){
        filteredHeroes = filteredHeroes.filter(hero => hero.powers.includes(query.power))
    }
    if (query.minLevel){
        const levelNum = Number(query.minLevel)
        filteredHeroes = filteredHeroes.filter(hero => hero.threatLevel >= levelNum)
    }
    if (query.maxLevel){
        const MaxlevelNum = Number(query.maxLevel)
        filteredHeroes = filteredHeroes.filter(hero => hero.threatLevel <= MaxlevelNum)
    }
    if (query.search){
        const sentence = query.search.toLowerCase()
        filteredHeroes = filteredHeroes.filter(hero => hero.codeName.toLowerCase()
        .includes(sentence) || (hero.notes || "").toLowerCase().includes(sentence))
    
    }
    if (query.sortBy){
        const authorizeSort = ["codeName", "threatLevel", "firstSighting"]

        if (!authorizeSort.includes(query.sortBy)){
            throw new Error("400 Invalid sortBy")
        }
            let order = "asc"
        if (query.order !== undefined){
            if (!query.order === "asc" && !query.order === "desc"){
                throw new Error("400 Invalid order")
            }

            order = query.order
        }
        const direction = order === "asc" ? 1 : -1

        filteredHeroes = [...filteredHeroes].sort((a, b) => {
            const valueA = a[query.sortBy]
            const valueB = b[query.sortBy]

            if (valueA > valueB) return 1 * direction
            if (valueA < valueB) return -1 * direction
            return 0       
        })    
    }
    const page = query.page ? Number(query.page) : 1 
    const limit = query.limit ? Number(query.limit) : 20 

    if (!Number.isInteger(page) || page < 1) {
    throw new Error("400 Invalid page")
}

if (!Number.isInteger(limit) || limit < 1) {
    throw new Error("400 Invalid limit")
}

const total = filteredHeroes.length 
const totalPages = Math.ceil(total / limit)

const startIndex = (page-1) * limit 
const endIndex = startIndex + limit 

const paginatedHeroes = filteredHeroes.slice(startIndex, endIndex)

return {
    data : paginatedHeroes,
    meta : {
        total, 
        page, 
        limit,
        totalPages
    }

}

}

export const advancedSearchHeroes = (heroes, body) => {
    let filteredHeroes = heroes

    if (body.statuses) {
        if (!Array.isArray(body.statuses)) {
            throw new Error("400 statuses must be an array")
        }

        if (body.statuses.length > 0) {
            filteredHeroes = filteredHeroes.filter(hero =>
                body.statuses.includes(hero.status)
            )
        }
    }

    if (body.powers) {
        if (!Array.isArray(body.powers)) {
            throw new Error("400 powers must be an array")
        }

        if (body.powers.length > 0) {
            filteredHeroes = filteredHeroes.filter(hero =>
                body.powers.some(power => hero.powers.includes(power))
            )
        }
    }

    if (body.minLevel !== undefined) {
        const levelNum = Number(body.minLevel)

        if (Number.isNaN(levelNum)) {
            throw new Error("400 Invalid minLevel")
        }

        filteredHeroes = filteredHeroes.filter(hero =>
            hero.threatLevel >= levelNum
        )
    }

    if (body.maxLevel !== undefined) {
        const maxLevelNum = Number(body.maxLevel)

        if (Number.isNaN(maxLevelNum)) {
            throw new Error("400 Invalid maxLevel")
        }

        filteredHeroes = filteredHeroes.filter(hero =>
            hero.threatLevel <= maxLevelNum
        )
    }

    if (body.affiliations) {
        if (!Array.isArray(body.affiliations)) {
            throw new Error("400 affiliations must be an array")
        }

        if (body.affiliations.length > 0) {
            filteredHeroes = filteredHeroes.filter(hero =>
                body.affiliations.some(affiliation =>
                    hero.affiliations.includes(affiliation)
                )
            )
        }
    }

    if (body.sortBy) {
        const authorizeSort = ["codeName", "threatLevel", "firstSighting"]

        if (!authorizeSort.includes(body.sortBy)) {
            throw new Error("400 Invalid sortBy")
        }

        let order = "asc"

        if (body.order !== undefined) {
            if (body.order !== "asc" && body.order !== "desc") {
                throw new Error("400 Invalid order")
            }

            order = body.order
        }

        const direction = order === "asc" ? 1 : -1

        filteredHeroes = [...filteredHeroes].sort((a, b) => {
            const valueA = a[body.sortBy]
            const valueB = b[body.sortBy]

            if (valueA > valueB) return direction
            if (valueA < valueB) return -direction
            return 0
        })
    }

    return filteredHeroes
}
