import { formSection, downloadSection } from "../utils/shared-utils.js";
import { doFetchForFile, doFetchForText, displayErrorMessage } from "../utils/index-utils.js";

export function renderEncryptionHTML() {
   downloadSection.innerHTML = "";

   formSection.innerHTML = `
      <form class="encryption-form js-encryption-form" enctype="multipart/form-data">
         <label for="file">Select File</label><br>
         <input class="selected-file js-selected-file" type="file" name="file" required><br>

         <label for="encryptionKey">Encrypt with a key</label><br>
         <input class="encryption-key js-encryption-key" type="password" name="encryptionKey" placeholder="encryption key" required><br>

         <label for="encryptionKey2">Enter the key again</label><br>
         <input class="encryption-key2 js-encryption-key2" type="password" name="encryptionKey2" placeholder="confirm encryption key" required><br>

         <div class="feo-section">
            <div class="feo-section-header">Choose prefered MFE mode</div>
            <select class="feo js-feo">
               <option selected value="DYNAMIC">DYNAMIC ENCRYPTION</option>
               <option value="FIXED">FIXED ENCRYPTION</option>
            </select>
         </div>
         <button class="encrypt-button js-encrypt-button" type="submit">Encrypt file</button>
      </form>
   `;

   document.querySelector(".js-encryption-form").addEventListener("submit", (event) => {
      event.preventDefault();

      const selectedFile = document.querySelector(".js-selected-file").files[0];
      const encryptionKey = document.querySelector(".js-encryption-key").value;
      const encryptionKey2 = document.querySelector(".js-encryption-key2").value;
      const feoSelection = document.querySelector(".js-feo").value;

      if (!validateFileFormData(selectedFile, encryptionKey, encryptionKey2)) return;

      encryptFile({ selectedFile, encryptionKey, feoSelection });

      encryptionKey = "";
      encryptionKey2 = "";
   });
}

export function renderTextEncryptionHTML() {
   downloadSection.innerHTML = "";

   formSection.innerHTML = `
      <form class="encryption-form js-encryption-form">
         <label for="text">Enter text</label><br>
         <textarea class="text-input js-text-input" name="text" placeholder="Type or paste your text here" required></textarea><br>

         <label for="encryptionKey">Encrypt with a key</label><br>
         <input class="encryption-key js-encryption-key" type="password" name="encryptionKey" placeholder="encryption key" required><br>

         <label for="encryptionKey2">Enter the key again</label><br>
         <input class="encryption-key2 js-encryption-key2" type="password" name="encryptionKey2" placeholder="confirm encryption key" required><br>

         <button class="encrypt-button js-encrypt-button" type="submit">Encrypt text</button>
      </form>
   `;

   document.querySelector(".js-encryption-form").addEventListener("submit", (event) => {
      event.preventDefault();

      const text = document.querySelector(".js-text-input").value;
      const encryptionKey = document.querySelector(".js-encryption-key").value;
      const encryptionKey2 = document.querySelector(".js-encryption-key2").value;

      if (!validateTextFormData(text, encryptionKey, encryptionKey2)) return;

      encryptText({ text, encryptionKey });

      encryptionKey = "";
      encryptionKey2 = "";
   });
}

// ENCRYPT FILE
function encryptFile(fileEncryptionObject) {
   downloadSection.innerHTML = "";

   const formData = new FormData();
   formData.append("file", fileEncryptionObject.selectedFile);
   formData.append("encryptionKey", fileEncryptionObject.encryptionKey);
   fileEncryptionObject.feoSelection === "DYNAMIC" && formData.append("encryptionMode", fileEncryptionObject.feoSelection);

   const urlString = "http://localhost:8060/api/v1/masterfileencryptor/encrypt-file";
   const request = new Request(urlString, { method: "POST", body: formData });

   doFetchForFile(request, "enc");
}

// ENCRYPT PLAIN TEXT
function encryptText(textEncryptionObject) {
   downloadSection.innerHTML = "";

   const urlString = "http://localhost:8060/api/v1/masterfileencryptor/encrypt-text";
   const request = new Request(urlString, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(textEncryptionObject)
   });

   doFetchForText(request);
}

function validateFileFormData(file, encryptionKey, encryptionKey2) {
   const maxSize = 200 * 1024 * 1024; // 200MB in bytes

   if (file.size > maxSize) {
      alert("File size exceeds the maximum limit of 200MB.");
      return false;
   } else if (encryptionKey.trim().length === 0 || encryptionKey.length < 3) {
      displayErrorMessage("Encryption key cannot be less than 3 characters!");
      return false;
   }
   else if (encryptionKey !== encryptionKey2) {
      displayErrorMessage("Encryption keys do not match!");
      return false;
   }

   return true;
}

function validateTextFormData(text, encryptionKey, encryptionKey2) {
   if (text.trim().length === 0) {
      alert("Cannot encrypt/decrypt empty text");
      return false;
   } else if (encryptionKey.trim().length === 0 || encryptionKey.length < 3) {
      displayErrorMessage("Encryption key cannot be less than 3 characters!");
      return false;
   }
   else if (encryptionKey !== encryptionKey2) {
      displayErrorMessage("Encryption keys do not match!");
      return false;
   }

   return true;
}
