import { encryptFile } from "./file.js";

const selectedFile = document.querySelector(".js-selected-file");
const encryptionKey = document.querySelector(".js-encryption-key");
const encryptionKey2 = document.querySelector(".js-encryption-key2");
const downloadSection = document.querySelector(".js-download-section");

document.querySelector(".js-file-data-form").addEventListener("submit", (event) => {
   event.preventDefault();

   if (encryptionKey.value !== encryptionKey2.value) {
      downloadSection.innerHTML = "<p>Encryption keys do not match!</p>";
      downloadSection.classList.add("password-error-message");
      return;
   }

   encryptFile(selectedFile.files[0], encryptionKey.value, downloadSection);
});
