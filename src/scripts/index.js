import { downloadSection, encryptFile, decryptFile } from "./file.js";

const formSection = document.querySelector(".js-form-section");

renderEncryptionHTML();

document.querySelector(".js-encrypt-file").addEventListener("click", () => renderEncryptionHTML());
document.querySelector(".js-decrypt-file").addEventListener("click", () => renderDecryptionHTML());

function renderEncryptionHTML() {
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

   document.querySelector(".js-encryption-form").addEventListener("submit", (event) => {
      event.preventDefault();

      const selectedFile = document.querySelector(".js-selected-file");
      const encryptionKey = document.querySelector(".js-encryption-key");
      const encryptionKey2 = document.querySelector(".js-encryption-key2");

      encryptFile(selectedFile.files[0], encryptionKey.value, encryptionKey2.value);

      selectedFile.value = "";
      encryptionKey.value = "";
      encryptionKey2.value = "";
   });
}

function renderDecryptionHTML() {
   downloadSection.innerHTML = "";

   formSection.innerHTML = `
      <form class="file-data-form js-decryption-form" enctype="multipart/form-data">
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

      selectedFile.value = "";
      encryptionKey.value = "";
   });
}

document.querySelector(".js-copy-cb").addEventListener("click", () => {
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