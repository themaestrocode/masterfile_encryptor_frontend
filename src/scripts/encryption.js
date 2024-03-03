import { encryptFile, encryptText, downloadSection } from "./file.js";

export function renderEncryptionHTML(formSection) {
   downloadSection.innerHTML = "";

   formSection.innerHTML = `
      <form class="file-data-form js-encryption-form" enctype="multipart/form-data">
         <label for="file">Select File</label><br>
         <input class="selected-file js-selected-file" type="file" name="file" required><br>

         <label for="encryptionKey">Encrypt with a key</label><br>
         <input class="encryption-key js-encryption-key" type="password" name="encryptionKey" placeholder="encryption key" required><br>

         <label for="encryptionKey2">Enter the key again</label><br>
         <input class="encryption-key2 js-encryption-key2" type="password" name="encryptionKey2" placeholder="confirm encryption key" required><br>

         <button class="encrypt-button js-encrypt-button" type="submit">Encrypt file</button>
      </form>
   `;

   elementSelector(".js-encryption-form").addEventListener("submit", (event) => {
      event.preventDefault();

      const selectedFile = document.querySelector(".js-selected-file");
      const encryptionKey = document.querySelector(".js-encryption-key");
      const encryptionKey2 = document.querySelector(".js-encryption-key2");

      encryptFile(selectedFile.files[0], encryptionKey.value, encryptionKey2.value);

      encryptionKey.value = "";
      encryptionKey2.value = "";
   });
}

export function renderPlainTextEncryptionHTML(formSection) {
   downloadSection.innerHTML = "";

   formSection.innerHTML = `
      <form class="file-data-form js-encryption-form">
         <label for="text">Enter plain text</label><br>
         <textarea class="plain-text-input js-plain-text-input" name="text" placeholder="Type or paste your text here" required></textarea><br>

         <label for="encryptionKey">Encrypt with a key</label><br>
         <input class="encryption-key js-encryption-key" type="password" name="encryptionKey" placeholder="encryption key" required><br>

         <label for="encryptionKey2">Enter the key again</label><br>
         <input class="encryption-key2 js-encryption-key2" type="password" name="encryptionKey2" placeholder="confirm encryption key" required><br>

         <button class="encrypt-button js-encrypt-button" type="submit">Encrypt text</button>
      </form>
   `;

   elementSelector(".js-encryption-form").addEventListener("submit", (event) => {
      event.preventDefault();

      const text = document.querySelector(".js-plain-text-input");
      const encryptionKey = document.querySelector(".js-encryption-key");
      const encryptionKey2 = document.querySelector(".js-encryption-key2");

      encryptText(text.value, encryptionKey.value, encryptionKey2.value);
      
      encryptionKey.value = "";
      encryptionKey2.value = "";
   });
}

function elementSelector(className) {
   return document.querySelector(className);
}