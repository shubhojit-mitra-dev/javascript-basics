type Cart = string[];  // ["t-shirt", "shoes"]

type OrderId = string;

function validateCart(cart: Cart): boolean {
    return cart.length > 0;
}

function createOrder(cart: Cart): Promise<OrderId> {
    const promise = new Promise<OrderId>((resolve, reject) => {
        if (!validateCart(cart)) {
            reject(new Error("cart is empty"));
        }
        // simulating an API response
        setTimeout(() => {
            const orderId: OrderId = "12345678";
            resolve(orderId);
        }, 5000)
    });

    return promise;
}


let cart: Cart = ["t-shirt"];

createOrder(cart)
.then((orderId) => console.log("Your order ID:", orderId))
.catch((err) => console.error(err));

cart = []

createOrder(cart)
.then((orderId) => console.log("Your order ID:", orderId))
.catch((err) => console.error(err));
