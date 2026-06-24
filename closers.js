const createLogger = () => {
    const message = "Hello";
    return () => message

}
//2
const createGretting = name => {
    const yourName = name
    return () => `Hello ${yourName}`
}
//3
const createConter = () => {
    let counter = 0

    return () => ++counter
}
//4 

// 10 because is a closer , inner return outer x 

//5

const createMultiplier = num => {
    let number = num
    return (multiply) => number * multiply
}

//6

const createAdder = num => {
    let number = num
    return (numAdder) => number + numAdder
}

//7
const createSecret = secret => {
    let secretS = secret
    const getSecret = () => secretS
    const setSecret = new_secret => {
        secretS = new_secret
        console.log("update succesfully ")
    }

    return {
        getSecret,
        setSecret
    }
}

//8
const once = fn => {
    let security = 0
    return () => {

        if (security > 0) { return "don't allowed" }
        security++
        return fn
    }
}

//12
const createStack = () => {
    let stack = []
    const push = (value) => stack.push(value)
    const pop = () => stack.pop()
    const peek = () => stack.at(-1)

    return { push, pop, peek }

}

//13
const gen = createIdGenerator = () => {
    let id = 0
    return () => ++id
}

//14

const createBankAccount = initialBalance => {
    let balance = initialBalance
    const deposit = amount => balance + amount
    const withdraw = amount => {
        if (amount > balance) return "you poor"
        return balance - amount
    }
    const getBalance = () => balance

    return { deposit, withdraw, getBalance }
}



const name = createGretting("avi")
console.log(name())

const counter = createConter()

console.log(counter())
console.log(counter())
console.log(counter())
console.log(counter())

const double = createMultiplier(2)
console.log(double(6))
const secret = createSecret("hello")
console.log(secret.getSecret())
secret.setSecret("nothello")
console.log(secret.getSecret())

const onetime = once(secret.getSecret())
console.log(onetime())
console.log(onetime())
console.log(onetime())

const stack = createStack()
stack.push(2)
stack.push(7)
stack.push(4)

console.log(stack.peek())
stack.pop()
console.log(stack.peek())