import { switchTheme, mainSection, sidebar, menuIcon, canceIcon } from "../utils/shared-utils.js";

loadCurrentTheme();

switchTheme.addEventListener("click", () => {
   toggleTheme();

   mainSection.classList.contains("light-theme-main") ? localStorage.setItem("theme", "light") : localStorage.setItem("theme", "dark");
});

menuIcon.addEventListener("click", () => {
   sidebar.style.display = "block";
   mainSection.classList.toggle("disable-interaction");
});

canceIcon.addEventListener("click", () => {
   sidebar.style.display = "none";
   mainSection.classList.toggle("disable-interaction");
});

function loadCurrentTheme () {
   localStorage.getItem("theme") === "light" && toggleTheme();
}

function toggleTheme() {
   mainSection.classList.toggle("light-theme-main");
   document.querySelector(".js-header").classList.toggle("light-theme-header");
   document.querySelector(".js-sidebar").classList.toggle("light-theme-sidebar");
}