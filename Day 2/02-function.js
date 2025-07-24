function nameOfTheFunction(name) {
    console.log(name); // `this` binding
}

console.log(typeof nameOfTheFunction("Shubhojit"))

// Arrow Function
const nameFunction = (name) => {
    return name // no `this` binding
}

console.log(typeof nameFunction("abc"));
