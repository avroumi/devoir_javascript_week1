// const math = require("./math")
// const avdancedMath = require("./avdancedMath")

// console.log(math.add(1, 2))

// console.log(math.name("David"))

// console.log(math.dict)

// console.log(math.mulitply(2, 4))

// console.log(avdancedMath.result)

// console.log(avdancedMath.number.reduce((acc, cur) => acc + cur, 0))

// console.log(avdancedMath.logger("INFO", "FILE NOT FOUND"))



////////////////////////////////////////////////////////////////////
//ES6 module 
import User, { sum, greet, isZougui, Car } from "./math.js"
import { welcome } from "./avdancedMath.js"

console.log(sum(2, 5))

console.log(greet("lolo"))

console.log(isZougui(2))

const user1 = new User("Dede")
console.log(user1)
console.log(user1.name)

const car1 = new Car("Ferrari")
console.log(car1)

console.log(welcome(2))