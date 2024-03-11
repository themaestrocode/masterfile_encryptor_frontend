import { encryptFile, encryptText } from "./file.js";
import { formSection, downloadSection } from "./utils.js";

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

      const selectedFile = document.querySelector(".js-selected-file");
      const encryptionKey = document.querySelector(".js-encryption-key");
      const encryptionKey2 = document.querySelector(".js-encryption-key2");
      const feoSelection = document.querySelector(".js-feo");

      encryptFile(selectedFile.files[0], encryptionKey.value, encryptionKey2.value, feoSelection.value);

      encryptionKey.value = "";
      encryptionKey2.value = "";
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

      const text = document.querySelector(".js-text-input");
      const encryptionKey = document.querySelector(".js-encryption-key");
      const encryptionKey2 = document.querySelector(".js-encryption-key2");

      encryptText(text.value, encryptionKey.value, encryptionKey2.value);

      encryptionKey.value = "";
      encryptionKey2.value = "";
   });
}
