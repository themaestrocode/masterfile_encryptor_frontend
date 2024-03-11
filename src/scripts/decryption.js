import { decryptFile, decryptText } from "./file.js";
import { formSection, downloadSection } from "./utils.js";

export function renderDecryptionHTML() {
   downloadSection.innerHTML = "";

   formSection.innerHTML = `
      <form class="decryption-form js-decryption-form" enctype="multipart/form-data">
         <label for="file">Select File</label><br>
         <input class="selected-file js-selected-file" type="file" name="file" required><br>

         <label for="encryptionKey">Provide encryption key</label><br>
         <input class="encryption-key js-encryption-key" type="password" name="encryptionKey" placeholder="encryption key" required><br>

         <button class="decrypt-button js-decrypt-button" type="submit">Decrypt file</button>
      </form>
   `;

   document.querySelector(".js-decryption-form").addEventListener("submit", (event) => {
      event.preventDefault();

      const selectedFile = document.querySelector(".js-selected-file");
      const encryptionKey = document.querySelector(".js-encryption-key");

      decryptFile(selectedFile.files[0], encryptionKey.value);

      encryptionKey.value = "";
   });
}

export function renderTextDecryptionHTML() {
   downloadSection.innerHTML = "";

   formSection.innerHTML = `
      <form class="decryption-form js-decryption-form">
         <label for="text">Enter text</label><br>
         <textarea class="text-input js-text-input" name="text" placeholder="Type or paste your text here" required></textarea><br>

         <label for="encryptionKey">Encrypt with a key</label><br>
         <input class="encryption-key js-encryption-key" type="password" name="encryptionKey" placeholder="encryption key" required><br>

         <button class="decrypt-button js-decrypt-button" type="submit">Decrypt text</button>
      </form>
   `;

   document.querySelector(".js-decryption-form").addEventListener("submit", (event) => {
      event.preventDefault();

      const text = document.querySelector(".js-text-input");
      const encryptionKey = document.querySelector(".js-encryption-key");

      decryptText(text.value, encryptionKey.value);
      
      encryptionKey.value = "";
   });
}