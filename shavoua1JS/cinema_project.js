// מחיר בסיס לכרטיס
const BASE_PRICE = 45;

// גיל מינימלי לסרטי "12+" ו-"18+"
const AGE_LIMIT_12 = 12;
const AGE_LIMIT_18 = 18;

// משתנים שיצטברו / ישתנו במהלך התוכנית
let totalTicketsSold = 0;
let totalRevenue = 0;

let legit_customer = []

const customers = [
  { name: "דנה", age: 17, movieRating: "12+", isStudent: true },
  { name: "יוסי", age: 25, movieRating: "18+", isStudent: false },
  { name: "מיכל", age: 10, movieRating: "12+", isStudent: false },
  { name: "רון", age: 16, movieRating: "18+", isStudent: true },
  { name: "ליאת", age: 30, movieRating: "כל הגילאים", isStudent: false },
  { name: "אבי", age: 8, movieRating: "כל הגילאים", isStudent: false },
];

for (const customer of customers){
    if (customer.age <  18 && customer.movieRating === "18+"  ){
        console.log(`Get outt < 18 : ${customer.name}`)
        continue 
    }else if (customer.age <  12 && customer.movieRating === "12+"  ){
         console.log(`Get outt < 12 : ${customer.name} `)
        continue
    }else {console.log(`welcome ${customer.name}`) 
    legit_customer.push(customer)          
}
}

let price = BASE_PRICE;

for (const customer of legit_customer){
switch (customer.movieRating) {
  case "18+":
    price = BASE_PRICE + 10;
    break;
  case "12+":
    price = BASE_PRICE + 5;
    break;
  case "כל הגילאים":
    price = BASE_PRICE;
    break;
  default:
    price = BASE_PRICE;

}
}
console.log(legit_customer)