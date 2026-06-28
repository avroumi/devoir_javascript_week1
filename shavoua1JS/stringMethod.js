const str1 = " hello world "
console.log(str1.trim())

const str2 = "avroumi97@gmail.com"
console.log(str2.includes("@"))

console.log(str1.toUpperCase())

const str3 = "HELLO WORLD"
console.log(str3.toLowerCase())

const str4 = "Javascript"
console.log(str4.slice(0, 4))

console.log(str4.slice(4,))

const str5 = "https://example.com"
console.log(str5.startsWith("https"))

console.log(str5.endsWith(".com"))

console.log(str1.replace("hello", "hi"))

const str6 = "banana"
console.log(str6.replaceAll("a", "o"))

const str7 = "one two three"
console.log(str7.split(" "))

console.log(str7.split(" ", 2))

console.log(str6.indexOf("a"))

console.log(str6.lastIndexOf("a"))



const str8 = "7"
console.log(str8.padStart(3, "0"))

const str9 = "hi"
console.log(str9.padEnd(5, "*"))

console.log(str1.charAt(1))

console.log(str1.at(-5))

console.log(str4.substring(2, 6))

const sameKey = require("./objectMethod.js")