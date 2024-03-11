import { renderEncryptionHTML, renderTextEncryptionHTML } from "./encryption.js";
import { renderDecryptionHTML, renderTextDecryptionHTML } from "./decryption.js";

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
