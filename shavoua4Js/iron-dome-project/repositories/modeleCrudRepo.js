import pool from '../db/database.js'

export const createRow = async (tablename, data) => {

    const key = Object.keys(data).map(key => `\`${key}\``).join(', ')
    const values = Object.values(data)
    const placeholders = Object.values(data).map(_ => "?").join(", ")

    const  [result] = await pool.execute(`
        insert into ${tablename} (${key}) values (${placeholders})`, values

    )
    return result.insertId
}

export const find = async (tableName, filter = {}) => {
    const conditions = Object.keys(filter)
        .map(key =>  `\`${key}\``).join(" and ")
    const values = Object.values(filter)
    const whereQuery = conditions? `where ${conditions}` : ''

    const [result] = await pool.execute(`select * from ${tableName}
        ${whereQuery}`, values)
    return result

}

export const findById = async (tableName, id) => {
    const result = await find(tableName, {id})
    if (result.length === 0){
        return false
    }
    return result[0] 
}

export const updateRow = async (tableName, id , updatedata ) => {
    const key = Object.keys(updatedata).map(key =>  `\`${key}\` = ? `).join(', ')
    const values = [...Object.values(updatedata), id]

    const [result] = await pool.execute(`update ${tableName} set ${key} where id = ?`, values)
    return result.affectedRows > 0 
}

export const deleteRow = async (tableName, id) => {
    const [result] = await pool.execute(`delete from ${tableName} where id = ?`,[id] )
    return result.affectedRows > 0 

}