const exercice5 = async (url) => {
    const res = await fetch(url)
    if (!res.ok) return res.message
    else {
        const data = await res.json()
        return data
    }
}

// exercice5("https://jsonplaceholder.typicode.com/todos/1").then(console.log)


//6

const done = async () => await "Done"

// done().then(console.log)

//7 

const carre = async number => await number * 4

// carre(5).then(console.log)

//14

const twoUrl = async (url1, url2) => {
    const res1 = await fetch(url1)
    const res2 = await fetch(url2)
    if (!res1.ok || !res2.ok) {
        throw new Error('error invalid url')
    }
    const data1 = await res1.json()
    const data2 = await res2.json()
    return [data1, data2]
}

// twoUrl("https://jsonplaceholder.typicode.com/todos/1", "https://jsonplaceholder.typicode.com/todos/2").then(console.log)

//15

const threeUrl = async (url1, url2, url3) => {
    const [res1, res2, res3] = await Promise.all([
        fetch(url1),
        fetch(url2),
        fetch(url3)
    ]);

    if (!res1.ok) {
        throw new Error(`error url1 ${res1.status}`)
    }
    if (!res2.ok) {
        throw new Error(`error url2 ${res2.status}`)
    }
    if (!res3.ok) {
        throw new Error(`error url3 ${res3.status}`)
    }

    return Promise.all([res1, res2, res3].map(data => data.json()))
}





// threeUrl("https://jsonplaceholder.typicode.com/todos/845735789", "https://jsonplaceholder.typicode.com/todos/2",
//     "https://jsonplaceholder.typicode.com/todos/3").then(console.log).catch(console.log)

//18 

const listUrl = async (listurl) => {
    const all = {}
    for (url of listurl) {
        const res = await fetch(url)
        if (!res.ok) continue;
        const data = await res.json()
        all[url] = data
    } return all
}

//19 

const listUrlMakbil = async (listurl) => {

    const promises = listurl.map(async url => {
        const res = await fetch(url)
        if (!res.ok) { throw new Error(res.status) }
        return await res.json()
    })

    return await Promise.all(promises)
}

