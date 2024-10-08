const themeToggle = document.querySelector("#theme-toggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
});
