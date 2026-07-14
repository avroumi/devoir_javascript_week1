import mysql from "mysql2/promise"


const  connectDataBase = (databaseName) => {
    return mysql.createPool({
        port: 3307,
        password: "root",
        user: "root",
        host:"localhost",
        database: databaseName

    })
}

const pool = connectDataBase("tamim_leolamim")

//exercice1 
const inner_join = async () => {
    const [result] = await pool.execute(`select u.name ,o.product, o.amount
         from users as u
        inner join orders  as o 
        on u.id = o.user_id `)

    const row = result.map(value => Object.values(value) )
    
    return row

}

// console.log(await inner_join())

//exercice2

const leftJoin = async () => {
    const [result] = await pool.execute(`select u.name, o.product from users as  u 
        left join orders as o 
        on u.id = o.user_id`)
    return result 
}

// console.log(await leftJoin())

//exercice3 
const leftJoinfilter = async () => {
    const [result] = await pool.execute(` select u.name from users as u 
        left join orders as o 
        on u.id = o.user_id 
        where o.product is null `)

    return result 
}

// console.log(await leftJoinfilter())

//exercice4 

const rich = async () => {
    const [result] =  await pool.execute(`select u.name, o.product, o.amount
        from users as u 
        inner join orders as o 
        on u.id = o.user_id 
        where o.amount > 500 
        order  by o.amount desc `)

    return result
}

// console.log(await rich())

//exercice 5

const threeJoin = async () => {
    const [result] = await pool.execute(`select u.name , o.product , c.city
        from users as u 
        inner join orders as o 
        on u.id = o.user_id 
        inner join cities as c 
        on u.city_id = c.id`)

    return result 
}

console.log(await threeJoin())