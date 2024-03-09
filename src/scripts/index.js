import { renderEncryptionHTML, renderTextEncryptionHTML } from "./encryption.js";
import { renderDecryptionHTML, renderTextDecryptionHTML } from "./decryption.js";

const formSection = document.querySelector(".js-form-section");
changeFileExtension("file.me.java");
function changeFileExtension(file) {
   const newFileName = file.replace(/\.[^/.]+$/, ".enc");

   console.log(("Original File Name: " + file));
   console.log("New File Name: " + newFileName);
}

renderEncryptionHTML(formSection);

document.querySelector(".js-encrypt-file").addEventListener("click", () => renderEncryptionHTML(formSection));
document.querySelector(".js-decrypt-file").addEventListener("click", () => renderDecryptionHTML(formSection));
document.querySelector(".js-encrypt-text").addEventListener("click", () => renderTextEncryptionHTML(formSection));
document.querySelector(".js-decrypt-text").addEventListener("click", () => renderTextDecryptionHTML(formSection));

const menuIcon = document.querySelector(".js-menu-icon");
const sidebar = document.querySelector(".js-sidebar");
const mainSection = document.querySelector("main");

menuIcon.addEventListener("click", () => {
   sidebar.style.display = "block";
   mainSection.style.opacity = "0.1";
});

const canceIcon = document.querySelector(".js-cancel-icon");
canceIcon.addEventListener("click", () => {
   sidebar.style.display = "none";
   mainSection.style.opacity = "1";
});

const copyButton = document.querySelector(".js-copy-cb");
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
copyButton.style.cursor = "pointer";
