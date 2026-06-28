import { log } from "node:console"

function hello(name){
    return ` hello ${name}`
}

console.log(hello("avi"))

const add = (a,b) => a + b 
console.log(add(2,5))

const isZuggui= number => {
    if (number %2 === 0 )
        return true ;
    else return false ;
}
console.log(isZuggui(3))

const firstList = arr => arr[0]
console.log(firstList([1,2,3,4]))

const lowerStr = world => world.toUpperCase()
console.log(lowerStr("avroumiiiiiiiiii"))

// let x = 5; //global scop 

// function test() {
//   let x = 10;
//   console.log(x); //local scop first
// }

// test();
// console.log(x);

function test() {
    const y = 10;
    console.log(y);
}

test();


// function a(){
//     console.log(b)
//  if(true){
//     const b = 7
//  }
// }
// a()

const increment = () => {
    let count = 0 ;
    function b(){
    count ++ ; 
    return count }
    return b ;
}

let moreMOre = increment()
console.log(moreMOre())
console.log(moreMOre())
console.log(moreMOre())


const total = arr => {
    let total = 0
    for (const n of arr){
        total += n
    }return total
}

console.log(total([1,2,3,4,5]))

const carre = arrow => arrow * 4 
const surface = (carre) => carre * carre

console.log(surface(carre(10)))

const zouguiArray = arr => {
    let total = 0 
    for (const n of arr){
        if (n % 2 ===0)
            total += n  
    }return total
}
console.log(zouguiArray([1,2,3,4,5,6]))


// let total1 = 0;

// function addToTotal(num) {
//   total1 += num;
// }

// function reset() {
//   total1 = 0;
// }

// addToTotal(5);
// addToTotal(10);
// reset();
// console.log(total1);


const threeMulitply = number => number * 3 
console.log(threeMulitply(3))

const worldLenght = world => world.length
console.log(worldLenght("joie"))

const Bedika = number =>{
    if (number > 0 )
        return "Positive"
    else if (number < 0 )
       return"Negative"
    else return "0"
}
console.log(Bedika(0))

const maxNumber = (a,b) => {
    if (a > b) return a 
    else if (b > a ) return b
    else return "egal"
}
console.log(maxNumber(2,2))

const lenghtArr = arr => arr.length
console.log(lenghtArr([1,2,3,4]))

// let x = 10;

// function change() {
//     x = 20;
// }
// change()
// console.log(x);

let num = 1;

function first() {
  num++;
}



function print(message) {
  console.log(message);
}
print("hi")

//////////////////////////////////////////////////////////////////////////////


const lowest = arr => Math.min(...arr)
console.log(lowest([-3,4,5,6]))

const modulo = (a,b) => {
    if (1 % b === 0 ) return true
    else return false
}
console.log(modulo(9, 13))

const joinList = arr => arr.join(",")
console.log(joinList([1,2,3,4,5]))

const numIn = num =>{
    for (let i = 0 ; i <= num ; i++)
        console.log(i)
}
numIn(8)

const unique = arr => {
    const uniqueArr = [];
    for (const num of arr){
        let itIs = false ;

        for (const n of uniqueArr){
            if (num  === n ){
                itIs = true
                break
    }
            
    }if (!itIs){
             uniqueArr.push(num)
    } 
    }
    
    return uniqueArr
    
}
console.log(unique([1,1,1,2,2,2,3,3,3,]))



function adda(numbers) {
    let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }return sum 
}

adda([1, 2]);
adda([3, 4]);

console.log(adda([3, 4]))

const sum = arr => {
    let total = 0 ;
    for (let n of arr){
        if (n % 2 === 0)
        total += n
    } return total 
}
console.log(sum([1,2,3,4,5]))


const discount = price => {
    const sale = 0.1;
    return price - (price * sale)
}
console.log(discount(100))