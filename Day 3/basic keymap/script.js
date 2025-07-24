const key = document.querySelector("#key");

window.addEventListener("keydown", (data) => {
    key.textContent = `${data.key}`;
})