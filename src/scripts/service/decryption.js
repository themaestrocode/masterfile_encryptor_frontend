import { formSection, downloadSection } from "../utils/shared-utils.js";
import { doFetchForFile, doFetchForText } from "../utils/index-utils.js";

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

      const selectedFile = document.querySelector(".js-selected-file").files[0];
      const encryptionKey = document.querySelector(".js-encryption-key").value;

      if (!validateFileFormData(selectedFile)) return;

      decryptFile({ selectedFile, encryptionKey });

      encryptionKey = "";
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

      const text = document.querySelector(".js-text-input").value;
      const encryptionKey = document.querySelector(".js-encryption-key").value;

      if (!validateTextFormData(text)) return;

      decryptText({ text, encryptionKey });
      
      encryptionKey = "";
   });
}

// DECRYPT FILE
function decryptFile(fileDecryptionObject) {
   downloadSection.innerHTML = "";

   const formData = new FormData();
   formData.append("file", fileDecryptionObject.selectedFile);
   formData.append("encryptionKey", fileDecryptionObject.encryptionKey);

   const urlString = "http://localhost:8060/api/v1/masterfileencryptor/decrypt-file";
   const request = new Request(urlString, { method: "POST", body: formData });

   doFetchForFile(request, "dec");
}

//DECRYPT PLAIN TEXT
function decryptText(textDecryptionObject) {
   downloadSection.innerHTML = "";

   const urlString = "http://localhost:8060/api/v1/masterfileencryptor/decrypt-text";
   const request = new Request(urlString, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(textDecryptionObject)
   });

   doFetchForText(request);
}

function validateFileFormData (file) {
   if (file.size > (200 * 1024 * 1024)) {
      alert("File size exceeds the maximum limit of 200MB.");
      return false;
   }

   return true;
}

function validateTextFormData(text) {
   if (text.trim().length === 0) {
      alert("Cannot encrypt/decrypt empty text.");
      return false;
   }

   return true;
}
