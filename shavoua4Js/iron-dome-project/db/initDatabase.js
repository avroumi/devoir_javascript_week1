import "dotenv/config"
import mysql from "mysql2/promise"

const createFirstConnection = () => {
    return mysql.createPool({
        host: process.env.DB_HOST,
        port:process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD })
}



const createDatabase = async (firstConnection) => {
    await firstConnection.execute(`create database if not exists ${process.env.DB_NAME}`)
    console.log("database initialised")
}



const createDatabasePool =  () => {
    return  mysql.createPool({
        host: process.env.DB_HOST,
        port:process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })
}




const createTables = async (pool) => {
    await pool.execute(`create table if not exists operators(
                id int primary key auto_increment ,
                name varchar(100) not null , 
                \`rank\` varchar(100) not null ) `)
    
    await pool.execute(`create table if not exists incidents (
                    id int primary key auto_increment , 
                    code_name varchar(100) not null ,
                    operator_id int ,
                    threat_level varchar(50) not null , 
                    status varchar(50) not null ,
                    created_at timestamp default current_timestamp , 
                    foreign key (operator_id)
                    references operators(id))`)
    await pool.execute(`create table if not exists logs (
                id int primary key auto_increment , 
                action varchar(100) not null ,
                incident_id int ,
                operator_id int , 
                description text , 
                created_at timestamp default current_timestamp ,
                foreign key (incident_id) 
                references incidents(id) ,
                foreign key (operator_id) 
                references operators(id))
                 `)  
        console.log('Tables initialyzed')
}

export const initDatabase = async () => {
    let firstConnection; 
    let pool; 

    try{
        firstConnection = createFirstConnection()
        await createDatabase(firstConnection)
        await firstConnection.end()
        firstConnection = null 

        pool = createDatabasePool()
        await createDatabasePool(pool)

        console.log("Database setup completed")
    }catch(error){
        console.log("Database setup failed", error.message)
        throw error 
    }finally{
        if (firstConnection){
            firstConnection.end()
        }
        if (pool){
            pool.end()
        }
    }
}