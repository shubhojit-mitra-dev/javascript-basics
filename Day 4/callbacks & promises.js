// create an order and return orderId
// Pyramid of Doom (Callback Hell)
api.createOrder(cart, (err, orderId) => {
    if (err) console.error(err);
    api.proceedToPayment(orderId, (err, msg) => {
        if (err) console.error(err);
        api.sendNotification(msg, (err, order) => {
            if (err) console.error(err);
            api.getOrderFromPartner(order);
        });
    });
});

// Inversion of Control

// ES6 --> Promises
// States of Promises: 1. Pending 2. Fulfilled 3. Rejected
// Promise chaining

// resolve or reject

// Promise humesha pending state pe rhta h initially

api.createOrder(cart)
.then((orderId) => api.proceedToPayment(orderId))
.then((msg) => api.sendNotification(msg))
.then((order) => api.getOrderFromPartner(order))
.catch((error) => console.error(error))
.finally(() => {
    // humesha execute hoga
})

