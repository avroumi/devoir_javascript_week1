const arr1 = [1, 2, 3, 4, 5, 1001, 1000]
const arrDouble = arr1.map(arr => arr * 2)
console.log(arrDouble)

const HL = ["hello", "world", "hi", "hello", "cat", "javascript"]
console.log(HL.map(word => word.toUpperCase()))

const newPrice = arr1.map(price => price * 1.17)
console.log(newPrice)

console.log(arr1.filter(num => num % 2 === 0))

console.log(HL.filter(word => word.length > 3))

const dict1 = [{ name: "Avi", age: 17 }, { name: "Dana", age: 22 }]
console.log(dict1.filter(user => user.age > 18))

console.log(dict1.map(dict => dict.name))

const taxes = arr1.map(price => price * 1.1).filter(num => num > 100)
console.log(taxes)


const arr2 = [10, 20, 30, 7, 9, 36]
console.log(arr2.reduce((acc, current) => acc + current, 0))


console.log(arr2.reduce((acc, current) => acc * current, 1))

//12
console.log((arr2.reduce((acc, cur) => acc + cur, 0)) / arr2.length)

//25
console.log(arr2.sort((a, b) => a - b))

//29
const deleteNum = (arr2.splice(1, 2))
console.log(arr2)

//32
const flipflap = [1, 2, [3, 4]]
console.log(flipflap.flat())

//36
const arr3 = arr2.filter(num => num % 2 === 0).map(num => num * 2).filter(num => num % 2 === 0)
const totalarr2 = arr3.reduce((acc, cur) => acc + cur, 0)
console.log(arr3, totalarr2)

//38

const dict3 = [{ type: "fruit" }, { type: "veg" }, { type: "fruit" }]
console.log(dict3.reduce((acc, item) => {
    const key = item.type

    if (!acc[key]) {
        acc[key] = [];
    }
    acc[key].push(item);

    return acc;
}, {}))

//39
const arr4 = [1, 2, 3, 4, 5, 1, 1, 2,]
console.log(arr4.some((num, index) => arr4.indexOf(num) !== index)) //true if doublon

//41
const products = [
    { name: "Laptop", price: 800, inStock: true, category: "tech" },
    { name: "Phone", price: 4000, inStock: true, category: "tech" },
    { name: "Shirt", price: 50, inStock: true, category: "fashion" }
];


const finalProduct = products
    .filter(dict => dict.inStock === true && dict.price > 100)
    .sort((a, b) => a.price - b.price)
    .map(dict => dict.name)
    .join(", ")

console.log(finalProduct)
