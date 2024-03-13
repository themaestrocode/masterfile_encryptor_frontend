import { showProgressBar, hideProgressBar, downloadSection } from "../controller/utils.js";

let filename = "";

//ENCRYPT FILE
export function encryptFile(file, encryptionKey, encryptionKey2, feoSelection) {
   downloadSection.innerHTML = "";

   if (!validateFileFormData(file, encryptionKey, encryptionKey2)) return;

   const formData = new FormData();
   formData.append("file", file);
   formData.append("encryptionKey", encryptionKey);
   feoSelection === "DYNAMIC" && formData.append("encryptionMode", feoSelection);

   const urlString = "http://localhost:8060/api/v1/masterfileencryptor/encrypt-file";
   const request = new Request(urlString, { method: "POST", body: formData });

   doFetchForFile(request, "enc");
}

// DECRYPT FILE
export function decryptFile(file, encryptionKey) {
   downloadSection.innerHTML = "";

   if (!validateFileFormData(file, encryptionKey, encryptionKey)) return;

   const formData = new FormData();
   formData.append("file", file);
   formData.append("encryptionKey", encryptionKey);

   const urlString = "http://localhost:8060/api/v1/masterfileencryptor/decrypt-file";
   const request = new Request(urlString, { method: "POST", body: formData });

   doFetchForFile(request, "dec");
}

// ENCRYPT PLAIN TEXT
export function encryptText(text, encryptionKey, encryptionKey2) {
   downloadSection.innerHTML = "";

   if (!validateTextFormData(text, encryptionKey, encryptionKey2)) return;

   const textObject = { text, encryptionKey };

   const urlString = "http://localhost:8060/api/v1/masterfileencryptor/encrypt-text";
   const request = new Request(urlString, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(textObject)
   });

   doFetchForText(request);
}

//DECRYPT PLAIN TEXT
export function decryptText(text, encryptionKey) {
   downloadSection.innerHTML = "";

   if (!validateTextFormData(text, encryptionKey, encryptionKey)) return;

   const textObject = { text, encryptionKey };

   const urlString = "http://localhost:8060/api/v1/masterfileencryptor/decrypt-text";
   const request = new Request(urlString, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(textObject)
   });

   doFetchForText(request);
}

// FETCH REQUEST FOR FILE
function doFetchForFile(request, operation) {
   showProgressBar();

   fetch(request)
      .then(response => {
         console.log(response);
         let validResponse = false;

         if (response.status === 200 && response.ok) validResponse = true;
         else if (response.status === 400) displayErrorMessage("The provided key is invalid/incorrect!");
         else if (response.status === 404) displayErrorMessage("File attachment not found!");
         else if (response.status === 413) displayErrorMessage("File size limit exceeded!");
         else if (response.status === 422) displayErrorMessage("Your file could not be processed. Your key may be invalid/incorrect.");
         else displayErrorMessage("Some error occured. Please try again.");

         if (!validResponse) {
            hideProgressBar();
            throw new Error(`Invalid response: ${response.status} - ${response.statusText}`);
         }

         const disposition = response.headers.get("Content-Disposition");

         if (disposition && disposition.includes("attachment")) {
            filename = extractFileName(disposition, operation);

            return response.blob();
         }
      })
      .then(blob => {
         const url = window.URL.createObjectURL(blob);
         generateDownloadLink(url, filename);
      })
      .catch(console.error);
}

// FETCH REQUEST FOR PLAIN TEXT
function doFetchForText(request) {
   showProgressBar();

   fetch(request)
      .then(response => {
         console.log(response);
         let validResponse = false;

         if (response.status === 200 && response.ok) validResponse = true;
         // else if (response.status === 400) displayErrorMessage("The provided key is invalid/incorrect!");
         else displayErrorMessage("Some error occured. Please try again and ensure you are using the right key.");

         if (!validResponse) {
            hideProgressBar();
            throw new Error(`Invalid response: ${response.status} - ${response.statusText}`);
         }
         return response.text();
      })
      .then(textResult => {
         console.log(textResult);
         diaplayTextResult(textResult);
      })
      .catch(console.error);
}

function validateFileFormData(file, encryptionKey, encryptionKey2) {
   const maxSize = 200 * 1024 * 1024; // 200MB in bytes

   if (file.size > maxSize) {
      alert("File size exceeds the maximum limit of 200MB.");
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
   }
   else if (encryptionKey !== encryptionKey2) {
      displayErrorMessage("Encryption keys do not match!");
      return false;
   }

   return true;
}

function extractFileName (disposition, operation) {
   // Extract filename using a regular expression
   const matches = /filename="(.+?)"/.exec(disposition);
   let filename = matches ? matches[1] : 'downloaded-file';

   if (operation === "enc") {
      filename = "mfeEnc_".concat(filename);
   } else {
      filename = filename.includes("mfeEnc_") ? filename.replace("mfeEnc_", "mfeDec_") : "mfeDec_".concat(filename);
   }

   return filename;
}

function displayErrorMessage(errorMessage) {
   downloadSection.innerHTML = `<p>${errorMessage}</p>`;
   downloadSection.classList.add("error-message");
}

function generateDownloadLink(url, filename) {
   downloadSection.classList.contains("error-message") && downloadSection.classList.remove("error-message");

   hideProgressBar();
   downloadSection.innerHTML = `
      <p class="filename">${filename}</p>
      <p>Your file is ready!</p>
      <div class="download-link">
         <a href="${url}" download="${filename}">Download your file</a>
      </div>
   `;
}

function diaplayTextResult(textResult) {
   downloadSection.classList.contains("error-message") && downloadSection.classList.remove("error-message");

   hideProgressBar();
   downloadSection.innerHTML = `
      <div class="text-result-div">
         <p>Your text is ready!</p>
         <a class="copy-text-result js-copy-text-result" title="Copy result to Clipboard">
            <img src="images/icons/mycopy.svg" />
         </a>
         <p class="text-result">${textResult}</p>
      </div>
   `;

   const copyButton = document.querySelector(".js-copy-text-result");
   copyButton.addEventListener("click", () => {
      const textResultArea = document.createElement("textarea");
      textResultArea.value = textResult;

      document.body.appendChild(textResultArea);
      textResultArea.select();
      document.execCommand("copy");

      document.body.removeChild(textResultArea);
   });
   copyButton.style.cursor = "pointer";
}
