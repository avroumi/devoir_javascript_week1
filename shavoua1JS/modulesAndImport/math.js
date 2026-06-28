// const add = (a, b) => a + b


// const name = name => `Hello ${name}`

// const dict = { name: "ronnn", age: 67 }

// const mulitply = (a, b) => a * b


// module.exports = { add, name, dict, mulitply }

//////////////////////////////////////////////////////////////////////

export const sum = (a, b) => a + b

export const greet = name => `"Hello ${name}`

export const isZougui = number => number % 2 === 0

export default class User {
    constructor(name) {
        this.name = name
    }
}

export class Car {
    constructor(brand) {
        this.brand = brand
    }
}