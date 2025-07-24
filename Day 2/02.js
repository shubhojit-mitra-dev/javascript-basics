var Pizza = [
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
];
// Add a new pizza
function AddPizza(_a) {
    var name = _a.name, price = _a.price, toppings = _a.toppings, crust = _a.crust;
    Pizza.push({ name: name, price: price, toppings: toppings, crust: crust });
}
console.log("Adding new pizza");
AddPizza({
    name: "Peppy Paneer",
    price: 25,
    toppings: ["paneer", "onions", "capsicum"],
    crust: "thin"
});
console.log("Added a new Pizza");
console.log(Pizza);
// Discount Function -- 20%
function DiscountFunction(discount) {
    return Pizza.map(function (pizza) { return pizza.price * (100 - discount) / 100; });
}
console.log(DiscountFunction(20));
