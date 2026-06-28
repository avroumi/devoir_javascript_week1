const { jsx } = require("react/jsx-runtime")

//1
commmonJs

//2
esmodule // aval hasseer .js o .ejs

//3
ESModule

//4 
commmonJs

//5
import { add } from "./math,js";

//6

import express from "my-app.js";

//7
import fs from "fs.js";

const path = fs("path");

//8
//express Dependencies
// nodemon devDependencies
//jest dev
// mongoose dependencies
//elsint dev

//9
//first is major , second is minor , third is patch

//10

// ^ just in next major 4.18.2 > 5.0.0
// automaticaly npm install the last version this sign limit the version
// * no limit the last , ~ patch limit , 4.18.2 just this version

//11

//1: false , 2: true , 3: true , 4: false ci = current version

//12
// just in the read line , is utile for the memory in start because is don't load all jsut if you need this
// is a async import

//13
// c: ...{}. = require("...") es= import {} from "....js"
// c : module.exports = {} es :  export function
// treeshaking no yes

//14
// es module beacause is more modern and simple and you have tree
// can use more esaier and yes for the progress

//15
//import express from "express";ES6
// module.exports = app; commonJS

//16
//1 to organize code into a separate files and reuse functions easily
//2 they depended on loading order anc could create global variable conflicts
//3 dependencies are needed to run the app , devdependencies in just in devlopement time
//4 it keeps the same package versions for everyone , package.js is thee version with ^~... not the exact version
//5 it is a very large module and you an install easely with npm i


//17
// you can't choose both in type , rewrite import in the same version
// fro mee i prefer import versio ES6 sometimes tranform import to object is more quicker



