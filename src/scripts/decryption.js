import { decryptFile, downloadSection } from "./file.js";

export function renderDecryptionHTML(formSection) {
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
