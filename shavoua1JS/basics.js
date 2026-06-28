import input from "analiza-sync"

const age = 20
const min_age = age >= 18 ? "mevouguar" : "katan"
console.log(min_age)

2

const num = 7
console.log(num % 2 == 0 ? "zougui" : "Izougui")

3 
const isLogedIn = true 
console.log(isLogedIn === true ? "barouh aba ":  "ana ithaber" )

const number = -7
if (number > 0) {
console.log("number positive")
}
else if (number === 0  ){
    console.log("number is 0")
}
else {
    console.log("Number is negative")
}

const a = 30 ;
const b = 20 ;
if (a > b){
    console.log("a > b")
}
else if (b > a ){
    console.log("b > a")
}
else {
    console.log("a === b ")
}

// let putPassword = ""
// const password = "1234"
// while (putPassword !== password){
//     putPassword = prompt("enter 4 number :" );
// }

// console.log("well done")

const x = 15
if (x >=10 && x <= 20){
    console.log("good number")
}

const grade = 90

if (grade >= 90){
    console.log("mezouyann you are totah")
}else if ( grade >= 75){
    console.log("good")
}else if (grade >= 60){
    console.log("passs")
}else {
    console.log("Failed")
};



const temp = 28
if (temp > 30){
    console.log("Very hot here , drink tea")
}else if (temp >= 20 ){
    console.log("very good here")
}else {console.log("Cold here , take a black gilet")
}



const Yourage = 20 
const hasId = false 
if (Yourage >= 18 && hasId){
    console.log("welcome")
}else {
    console.log("go back to school")}

const isAdmin = false
const isManager = true 

if (isAdmin || isManager){
    console.log("welcome boss")
}else {console.log("too poor ")}


// hasCard = false 
// console.log(!hasCard  ? "welcome" : "not welcome")

const ValidName = ""
console.log(ValidName ||"Guest" )


const arr = [3]
if (arr.length > 0){
    console.log("true")
}else {console.log("false")}


const p = "5"
const n = 5

console.log(p === n) // aereh aamiti im atyp
console.log(p == n) // lo im atip 

const username = "admin"
const Passsword = "1234"
if (username == "admin" && Passsword == 1234){
    console.log("welcome")
} else console.log("Wrong passsword or username")


const AGE = 67 ;
if (AGE >= 65){
    console.log("anahat old mennn")
} else if (AGE < 18) {
    console.log("young man your have a price")
} else {
    console.log("not sale for you")
}

const day = "Lundi" 
switch (day) {
    case "Vendredi":
        case "Shabat":
            console.log("SHABATTT KODESHHH")
            break ; 
    
    case "Lundi":
        console.log("thilat shavoua")
        break ;
    
    case "Dimanche":
        console.log("tanouah habibi")
        break;

    default : 
    console.log("raguil day")
}


const total = 250

if (total > 300){
    console.log("free delivery")
} else if (total>= 150){
    console.log("delivery 20 $")
}  else {console.log("delivery 40 $")}

const role = "editor"
switch (role){
    case "admin":
        console.log("all authority")
        break ;
    case "editor":
        console.log("just write")
        break ;
    case "viewer" : 
    console.log("read only")
    break;
    default:
        console.log("You not authorized to bee here get out")
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
//loulaot

for (let i = 1 ; i < 11 ; i++){
    console.log(i)
}

for ( let i = 10 ; i >=0 ; i--){
    console.log(i)
}


let numtotal = 0
const numbers = [1, 2, 3, 4, 5];
for (let i = 0 ; i < numbers.length; i++){
    numtotal += numbers[i]
}
console.log(numtotal)

const names = ["דנה", "יוסי", "מיכל", "רון"];
for (const name of names){
    console.log(name)
}

const Lnumbers = [2, 5, 8, 11, 14, 17, 20];
for (const n of Lnumbers){
    if (n % 2 == 0){
        console.log(n)
    }
}
let maxNum = 0
const Pnumbers = [3, 99, 12, 45, 78];
for (const p of Pnumbers){
    if (p > maxNum){
        maxNum = p
    }
}console.log(maxNum)


let superlist = []
const word = "javascript";
for (const l of word){
    superlist.push(l)
}console.log(superlist)

const Dnumbers = [1, 2, 3, 4];
for (let Double of Dnumbers){
    console.log(Double * 2 )
}
let i = 1
while (i <= 10){
    console.log(i)
    i ++

}

// let input = ""
// while (input === "stop"){
//    input = prompt("Please stop this")
// }

let xxx = 1 ;
while (xxx <= 20){
    console.log(xxx)
    xxx ++ 
}


let dodo = 0 ;
do{
    console.log(dodo)
}while (dodo > 1){
    dodo += 1 
}


// let choice ; 
// do {
//     console.log(choice)
// }while (choice != "exit")
//     choice = "exit"

const Fnumbers = [1, 3, 7, 9, 15, 2];
for (const i of Fnumbers){
    if (i > 10){
        console.log(i)
        break
    }  
}

const Nnumbers = [5, -1, 8, -3, 10];
for (const i of Nnumbers){
    if (i < 0) {
        continue
    } console.log(i)
}

const ages = [12, 15, 18, 21, 25];
for (const i of ages){
    if (i >= 18){
        console.log(i)
        break
    }
}

const Parr = [10, 20, 30, 40, 50];
for (const a of Parr){
    console.log(a)
}

let zouguiTotal = 0
const Znumbers = [1, 2, 3, 4, 5, 6];
for (const z of Znumbers){
    if (z % 2 === 0){
        zouguiTotal += z
    } 
}console.log(zouguiTotal)


let flag = false
const target = 250;
const Tnumbers = [10, 15, 20, 25, 30];
for (const n of Tnumbers){
    if (n === target){
        console.log(`Target found ${n}`)
        flag = true
        break 
    }
    
}if (!flag)
            {console.log("Target not found")

    }

const Uword = "hello world";
for (let w of Uword){
    console.log(w.toUpperCase())
}

const uTnumbers = [2, 4, 6, 8, 10, 12];
for (const t of uTnumbers){
    
    if (t % 2 === 0 && t > 8 ){
        console.log(t)
        break
    }
}

const students = [
  { name: "דנה", grade: 55 },
  { name: "יוסי", grade: 90 },
  { name: "מיכל", grade: 78 },
  { name: "רון", grade: 45 },
];
for (const s of students){
    if (s["grade"] > 60){
        console.log(s["name"])
    }if (s["grade"] === 100){
        break
    }

}


let l = input("enter a name")
console.log(l)