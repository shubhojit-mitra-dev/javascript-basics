console.log("start")

Promise.resolve().then(() => {   // This goes into micro task queue
    console.log("promise 1");
    setTimeout(() => {
        console.log("timer 1");
    }, 0);
})

// Micro  [  ]   --> Event loop context switch krta h
// Macro  [  ]

setTimeout(() => {              // This goes into macro task queue
    console.log("timer 2");
    Promise.resolve().then(() => {
        console.log("promise 2");
    })
}, 0)

console.log("end");