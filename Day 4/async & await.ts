const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("I am resolved");
    }, 5000)
})

async function asyncFunction() {
    console.log("start");
    const result = await p;
    console.log("end");
    console.log(result);
}

asyncFunction();
