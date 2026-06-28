import { receiveMessageOnPort } from "node:worker_threads";

const listNum = [1, 2, 3]
console.log(listNum)

const fruits = ["apple", "banana", "cherry"];
console.log(fruits[0], fruits[2])

fruits[1] = "mango"
console.log(fruits)

fruits.push("orange")
console.log(fruits)
console.log(fruits.length)

fruits.pop()
console.log(fruits)

fruits.unshift("kiwi")
console.log(fruits)

fruits.shift()
console.log(fruits)


const arr = ["a", "b", "c", "d"];

arr.splice(1, 1)
console.log(arr)

arr.splice(1, 0, "X")
console.log(arr)

arr.splice(2, 1, "Y")
console.log(arr)

const number = [1, 2, 3, 4, 5, 6, 7, 8]
console.log(number.length)
console.log(number[7])

const melange = [1, "lol", true]
console.log(melange[0])
console.log(melange[1])
console.log(melange[2])

const nums = [10, 20, 30];
for (const n of nums) {
    console.log(n)
}

const encorrrre = [5, 10, 15];
console.log(encorrrre[0] + encorrrre[1] + encorrrre[2])

const bigger = [3, 8, 12, 1];
for (const n of bigger) {
    if (n > 5)
        console.log(n)
}


bigger.splice

const arr1 = [1, 2, 3, 4, 5]
const arrDouble = arr1.map(arr => arr * 2)
console.log(arrDouble)

const HL = ["hello", "world", "hi", "hello", "cat", "javascript"]
console.log(HL.map(word => word.toUpperCase()))

const newPrice = arr1.map(price => price * 1.17)
console.log(newPrice)

console.log(arr1.filter(num => num % 2 === 0))

console.log(HL.filter(word => word.length > 3))

