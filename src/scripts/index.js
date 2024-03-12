import { renderEncryptionHTML, renderTextEncryptionHTML } from "./encryption.js";
import { renderDecryptionHTML, renderTextDecryptionHTML } from "./decryption.js";

setTheme();
renderEncryptionHTML();

document.querySelector(".js-encrypt-file").addEventListener("click", () => renderEncryptionHTML());
document.querySelector(".js-decrypt-file").addEventListener("click", () => renderDecryptionHTML());
document.querySelector(".js-encrypt-text").addEventListener("click", () => renderTextEncryptionHTML());
document.querySelector(".js-decrypt-text").addEventListener("click", () => renderTextDecryptionHTML());

const menuIcon = document.querySelector(".js-menu-icon");
const sidebar = document.querySelector(".js-sidebar");
const mainSection = document.querySelector("main");

menuIcon.addEventListener("click", () => {
   sidebar.style.display = "block";
   mainSection.classList.toggle("disable-interaction");
});

const canceIcon = document.querySelector(".js-cancel-icon");
canceIcon.addEventListener("click", () => {
   sidebar.style.display = "none";
   mainSection.classList.toggle("disable-interaction");
});

const copyButton = document.querySelector(".js-copy-cb");
copyButton.style.cursor = "pointer";
copyButton.addEventListener("click", () => {
   // Create a temporary textarea element to facilitate copying
   const textarea = document.createElement('textarea');
   textarea.value = "http://127.0.0.1:5501";
   // Append the textarea to the document
   document.body.appendChild(textarea);
   // Select the text in the textarea
   textarea.select();
   // Execute the copy command
   document.execCommand("copy");
   // Remove the temporary textarea
   document.body.removeChild(textarea);
});

function setTheme () {
   document.addEventListener("DOMContentLoaded", () => {
      const switchTheme = document.querySelector(".js-switch-theme");

      localStorage.getItem("theme") === "light" && toggleTheme();

      switchTheme.addEventListener("click", () => {
         toggleTheme();

         mainSection.classList.contains("light-theme-main") ? localStorage.setItem("theme", "light") : localStorage.setItem("theme", "dark");
      });
   });

   function toggleTheme() {
      mainSection.classList.toggle("light-theme-main");
      document.querySelector(".js-header").classList.toggle("light-theme-header");
      document.querySelector(".js-sidebar").classList.toggle("light-theme-sidebar");
   }
}
