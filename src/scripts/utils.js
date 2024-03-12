export const formSection = document.querySelector(".js-form-section");
export const downloadSection = document.querySelector(".js-download-section");
export const switchTheme = document.querySelector(".js-switch-theme");

export const menuIcon = document.querySelector(".js-menu-icon");
export const canceIcon = document.querySelector(".js-cancel-icon");
export const sidebar = document.querySelector(".js-sidebar");
export const mainSection = document.querySelector("main");

export function showProgressBar () {
   formSection.innerHTML = `
      <div class="progress-bar-section">
         <label for="progress-bar">Processing your request...</label><br>
         <progress id="progress-bar" class="progress-bar js-progress-bar" max="100"></progress>
      </div>
   `;
}

export function hideProgressBar () {
   formSection.innerHTML = "";
}

export function loadCurrentTheme () {
   // document.addEventListener("DOMContentLoaded", () => {

   // });

   localStorage.getItem("theme") === "light" && toggleTheme();
}

// document.addEventListener("DOMContentLoaded", () => {

//    localStorage.getItem("theme") === "light" && toggleTheme();

//    switchTheme.addEventListener("click", () => {
//       toggleTheme();

//       mainSection.classList.contains("light-theme-main") ? localStorage.setItem("theme", "light") : localStorage.setItem("theme", "dark");
//    });

//    menuIcon.addEventListener("click", () => {
//       sidebar.style.display = "block";
//       mainSection.classList.toggle("disable-interaction");
//    });

//    
//    canceIcon.addEventListener("click", () => {
//       sidebar.style.display = "none";
//       mainSection.classList.toggle("disable-interaction");
//    });
// });

export function toggleTheme() {
   mainSection.classList.toggle("light-theme-main");
   document.querySelector(".js-header").classList.toggle("light-theme-header");
   document.querySelector(".js-sidebar").classList.toggle("light-theme-sidebar");
}