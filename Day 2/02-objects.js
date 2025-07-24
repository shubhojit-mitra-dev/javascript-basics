
const Person = {
    name: "Shubhojit",
    age: 19,
    getName: function() {   // IIFE
        return this.name;
    },
    getAge: () => {
        return this.age;
    }
}

console.log(Person.getAge());

// for ...in && for ...of

for (const key in Person) {
    console.log(key + " : " + Person[key]);
}

for (const value of Object.values(Person)) {
    console.log(value);
}
