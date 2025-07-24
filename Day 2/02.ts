// Pizza store -- Objects, Arrays, Functions
type topping = "cheese" | "basil" | "pepperoni" | "onions" | "capsicum" | "paneer"

type crustType = "thin" | "cheese burst"

type pizza = {
    name: string
    price: number
    toppings: topping[]
    crust: crustType
}

const Pizza: pizza[] = [
    {
        name: "margherita",
        price: 20,
        toppings: ["cheese", "basil"],
        crust: "thin"
    },
    {
        name: "pepperoni",
        price: 25,
        toppings: ["cheese", "pepperoni", "onions"],
        crust: "cheese burst"
    }
]

// Add a new pizza
function AddPizza({
    name,
    price,
    toppings,
    crust
}: pizza) {
    Pizza.push({ name, price, toppings, crust });
}

console.log("Adding new pizza");
AddPizza({
    name: "Peppy Paneer",
    price: 25,
    toppings: ["paneer", "onions", "capsicum"],
    crust: "thin"
})

console.log("Added a new Pizza");
console.log(Pizza);

// Discount Function -- 20%
function DiscountFunction(discount: number): number[] {
    return Pizza.map((pizza) => pizza.price * (100 - discount)/100);
}

console.log(DiscountFunction(20));



