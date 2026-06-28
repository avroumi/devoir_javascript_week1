const name = "AlICe"
const upper = name => name.toLowerCase()

console.log(upper(name))

//2
const hello = "   hello world  "
const clean = hello => hello.trim()

console.log(clean(hello))

//3

const email = "avroumi97@gmail.com"
const isemail = email => email.includes("@")
console.log(isemail(email))

//4 
//// you don't repeat string exercice  go to object exercice 


//////////////////////////////////////////////////////////////////////////////
//object Method

const dict1 = { name: "avroumi", age: 30, city: "Jerusalem" }

//1
const justKey = dict => Object.keys(dict)
console.log(justKey(dict1))

//2

const justValue = dict => Object.values(dict)
console.log(justValue(dict1))

//3 

const allKeyValue = dict => Object.entries(dict)
console.log(allKeyValue(dict1))

//4 

const dict2 = { math: 80, english: 90, science: 70 }

const average = dict => Object.values(dict).reduce((acc, curr) => acc + curr, 0) / Object.values(dict).length
console.log(average(dict2))

//5

const assignDict = (dict1, dict2) => Object.assign(dict1, dict2)
console.log(assignDict(dict1, dict2))

//6

const dict4 = { theme: "light", lang: "en" }
const replace = (dict, dict2) => Object.assign(dict, dict2);
console.log(replace(dict4, { lang: "he" }))

//7 
const isInObject = (dict, key) => Object.hasOwn(dict, key)
console.log(isInObject(dict2, "math"))

//8
const dict6 = {
    name: 'avroumi',
    age: 30,
    city: 'Jerusalem',
    math: 80,
    english: 90,
    science: 70
}
const immutable = dict => Object.freeze(dict)
immutable(dict6)
// console.log(assignDict(dict6, dict1))

//9

const matrix = [["name", "Alice"], ["age", 25]]
const listTodict = matrix => Object.fromEntries(matrix)
console.log(listTodict(matrix))

//10

const fruit = { apple: 10, banana: 5, mango: 20 }
const taxeB = dict => {
    let tupple = Object.entries(dict)
    const applyTaxe = tupple.map(([k, v]) => [k, v * 1.1])
    const finalDict = Object.fromEntries(applyTaxe)
    return finalDict

}
console.log(taxeB(fruit))

//11 

const IsKeyNum = dict => {
    const arr = Object.entries(dict)
    return arr.filter(([k, v]) => typeof v === "number");
}
console.log(IsKeyNum(fruit))

//12

const doubleIt = dict => Object.fromEntries(Object.entries(dict))

const dict9 = doubleIt(dict2)

dict9.math = "ron"
console.log(dict2)
console.log(dict9)

//13

const sameKey = (dict1, dict2) => {
    const key1 = Object.keys(dict1)
    const key2 = Object.keys(dict2)

    return key1.length === key2.length && key1.every(key => key2.includes(key))
}
console.log(sameKey(dict2, dict2))

