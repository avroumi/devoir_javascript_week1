import fs from 'fs/promises'

// fs.readFile('data/message.txt', 'utf-8')
//     .then(console.log).catch(console.error)

// fs.readFile('data/step1.txt', 'utf-8').
//     then((data) => {
//         return fs.readFile('data/step2.txt', 'utf-8')
//             .then((data2) => {
//                 return fs.readFile('data/step3.txt', 'utf-8')
//                     .then((data3) => { return data + "\n" + data2 + "\n" + data3 })
//             })
//     }).then(console.log)



const createUser = username => {
    return fs.mkdir(`data/user/${username}`, { recursive: true })
}

const writeProfile = (username, data) => {
    return fs.writeFile(`data/user/${username}/profile.txt`, JSON.stringify(data))
}

const readProfile = username => {
    return fs.readFile(`data/user/${username}/profile.txt`, 'utf-8')
}


createUser('alice')
    .then(() => writeProfile('alice', { role: "employee" }))
    .then(() => readProfile('alice'))
    .then(console.log)
    .catch(console.error)