var list1 = [2,5,3,6];

// for (const i in list1) {
//     console.log(list1[i]);
// }

list1.forEach((index) => {
    console.log(list1[index]);
})

// Higher Order Functions  --> Function jo apne parameter me function le ya ek function return kre

// Callback --> jo function as an argument pass ho

// IIFE (Immediately Invoked Function Expression)  --> Anonymous functions

// array.push("sjfs") --> end 
// array.pop()  --> last and returns it
// array.shift() --> 0th index element ko remove krta
// array.unshift("elem") --> 0th index pe element add krta h


// Functional Programming
// map, filter and reduce

// array.map(callback)  --> returns a new array  (90%)
// array.filter(callback: returns a condition) --> return new array
// array.reduce() ---> Reduce into a single value
var list1 = [2,5,3,6];

const SquareArray = list1.map(n => n*n); // [4,25,9,36]
console.log(SquareArray);

const EvenArray = list1.filter(n => n % 2 === 0);
console.log(EvenArray);

const sum = list1.reduce((total, n) => total + n, 0);
console.log(sum);


