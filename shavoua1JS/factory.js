const createName = (name, age) => // 1-> 5 exercice
({
    name,
    age,
    greet() {
        return `Hello i'm ${name}`
    },
    majeur() {
        return age > 18
    }
})


const createCounter = () => {
    let increment = 0
    return () => ++increment

}

const counter = () => {
    let counter = 0
    return () => counter++
}

const yourCounter = (number) => {
    let counter = number
    return () => ++counter
}

const counterNOw = () => {
    let counter = 0
    return () => counter
}
//^^^ 6-10
/////////////////////////////////////////////////////////////////////////


const createIncrement = () => {
    let number = 0
    return {
        increment() {
            return ++number
        },
        reset() {
            return number = 0

        }
    }
}


// const create = createIncrement()
// console.log(create.increment())
// console.log(create.increment())
// console.log(create.increment())
// console.log(create.reset())
// console.log(create.increment())

///////////////////////////////////////////////////////////////////////////
//15+

const createObject = (name, price, stock = 0) => {

    const isStock = () => stock > 0
    if (price < 0) {
        return "price can be negative"
    }

    return {
        name,
        price,
        stock,
        isStock
    }


}


const user1 = createObject("avroumi", 60, 3)
console.log(user1.isStock())

//////////////////////////////////////////////////////////////////
//19+

const multiply = number => {
    let num = number
    return (double) => double * num
}

// const num = multiply(10)
// console.log(num(10))
// console.log(num(0))

const addSentence = fullname => {
    const name = fullname
    return (sentence) => `${name}  ${sentence}`
}

const add = addSentence("dana")
console.log(add("bonour"))

//21

const secretList = sentence => {
    let secret = [sentence]
    return {
        addSecret(sentence) {
            secret.push(sentence)

        },
        getSecret() {
            return secret
        },
        delsecret(index) {
            secret.splice(index, 1)
        }
    }
}

const lsit = secretList("hello")
console.log(lsit.addSecret("sentence"))
console.log(lsit.getSecret())
lsit.delsecret(1)
console.log(lsit.getSecret())

///////////////////////////////////////////////////////////////////////////
//24+


const createUser = name => {
    let loginCount = 0

    return {
        name,

        login() {
            loginCount++
            return loginCount
        },

        getLoginCount() {
            return loginCount
        }
    }
}


//25
const createRoleManager = () => {
    let roles = []

    return {
        add(role) {
            if (!roles.includes(role)) {
                roles.push(role)
            }
        },

        remove(role) {
            const index = roles.indexOf(role)

            if (index !== -1) {
                roles.splice(index, 1)
            }
        },

        check(role) {
            return roles.includes(role)
        },

        getRoles() {
            return [...roles]
        }
    }
}




// const user1 = createName("avroumii", 28)
// const user2 = createName("aron", 27)
// console.log(user1.greet())
// console.log(user2.greet())
// console.log(user1.majeur())
// console.log(user2)