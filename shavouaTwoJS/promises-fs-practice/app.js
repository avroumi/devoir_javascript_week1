import fs from 'fs'

const writeFileAsPromise = (filepath, content) => {
    return new Promise((res, rej) => {
        fs.writeFile(filepath, content, (err => {
            if (err) rej(err);

            res("write succesfully")

        }))
    })
}
// writeFileAsPromise('data/message.txt', "hello world")
//     .then(message => console.log(message))
//     .catch(err => console.log(err))


const readFileAsPromise = filepath => {
    return new Promise((res, rej) => {
        fs.readFile(filepath, "utf-8", (err, data) => {
            if (err) rej(err)
            res(data)
        })
    })

}

// readFileAsPromise('data/message.txt')
//     .then(data => console.log(data))
//     .catch(err => console.log(err))

const readFileAndCount = filename => {
    return new Promise((res, rej) => {
        fs.readFile(filename, "utf-8", (err, data) => {
            if (err) rej(err)
            const weight = data.length
            res(weight)
        })
    })
}

// readFileAndCount('data/message.txt')
//     .then(weight => console.log(weight))
//     .catch(err => console.log(err))


const appendFilesAsPromises = (filepath, content) => {
    return new Promise((res, rej) => {
        fs.appendFile(filepath, content, (err) => {
            if (err) rej(err)
            res("Append Succesfully")
        })
    })
}

// appendFilesAsPromises('data/step1.txt', "step 1")
//     .then(() => console.log("step 1 Done"))
//     .then(() => appendFilesAsPromises('data/step2.txt', "step2"))
//     .then(() => console.log("step2 Done"))
//     .then(() => appendFilesAsPromises('data/step3.txt', "step3"))
//     .then(() => console.log("step3 Done"))
//     .catch(console.log)


const final = []

// readFileAsPromise('data/step1.txt')
//     .then(data => final.push(data))
//     .then(() => readFileAsPromise('data/step2.txt'))
//     .then(data => final.push(data))
//     .then(() => readFileAsPromise('data/step3.txt'))
//     .then(data => final.push(data))
//     .catch(console.log)
//     .finally(() => console.log(final))

writeFileAsPromise('data/report-title.txt', 'Daily report')
    .then(() => writeFileAsPromise('data/report-body.txt', "Everithing is Working"))
    .then(() => {
        return readFileAsPromise('data/report-title.txt')
            .then((data1) => {
                return readFileAsPromise('data/report-body.txt')
                    .then((data2) => {
                        return data1 + '\n' + data2
                    })
            })
    }).then((final) => writeFileAsPromise('data/final-report.txt', final))
    .then(console.log)
    .catch(console.error)


