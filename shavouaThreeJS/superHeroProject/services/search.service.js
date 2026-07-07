


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
        filteredHeroes = filteredHeroes.filter(hero => hero.codeName.toLowerCase().includes(sentence) || (hero.notes || "").toLowerCase().includes(sentence))
    
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