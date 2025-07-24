// 4 pillars of DOM
// 1. Selection
// 2. Change
// 3. Dynamic creation
// 4. Event listeners  -- event (action)

// How to select
// const h1 = document.querySelectorAll("#heading");
// const h1 = document.getElementById("heading")
// const h1 = document.getElementsByClassName()
// const h1 = document.querySelectorAll("h1");

// How to change something
// h1.innerText = "Hello World"
// h1.innerHTML = "<i>Hello</i>"
// h1.textContent = "Hello"
// h1[0].classList.add("text-red-500");
// h1[0].classList.remove("text-red-500");
// h1[0].classList.toggle("text-red-500");

// h1[0].style.backgroundColor = "red" // Camel Case for CSS styles

// Dynamic Creation


// Event Listener
const box = document.querySelector("#box")


box.addEventListener("click", () => {
    const text = document.createElement("h1");
    text.textContent = "I am inside box"
    box.appendChild(text)
    // box.removeChild(text)
})

box.addEventListener("dblclick", () => {
    box.removeChild(text)
})




// console.log(h1);
