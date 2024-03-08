let formData;
let filename = "";
let urlString = "";
let request;

export const downloadSection = document.querySelector(".js-download-section");

//ENCRYPT FILE
export function encryptFile(file, encryptionKey, encryptionKey2) {
   if (encryptionKey !== encryptionKey2) {
      displayErrorMessage("Encryption keys do not match!");
      return;
   }

   formData = new FormData();
   formData.append("file", file);
   formData.append("encryptionKey", encryptionKey);

   urlString = "http://localhost:8060/api/v1/masterfileencryptor/encrypt-file/jasypt";
   request = new Request(urlString, { method: "POST", body: formData });

   doFetchForFile(request);
}

// DECRYPT FILE
export function decryptFile(file, encryptionKey) {
   formData = new FormData();
   formData.append("file", file);
   formData.append("encryptionKey", encryptionKey);

   urlString = "http://localhost:8060/api/v1/masterfileencryptor/decrypt-file/jasypt";
   request = new Request(urlString, { method: "POST", body: formData });

   doFetchForFile(request);
}

// ENCRYPT PLAIN TEXT
export function encryptText(text, encryptionKey, encryptionKey2) {
   if (encryptionKey !== encryptionKey2) {
      displayErrorMessage("Encryption keys do not match!");
      return;
   }

   const textObject = { text, encryptionKey };

   urlString = "http://localhost:8060/api/v1/masterfileencryptor/encrypt-text";
   request = new Request(urlString, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(textObject)
   });

   doFetchForText(request);
}

//DECRYPT PLAIN TEXT
export function decryptText(text, encryptionKey) {
   const textObject = { text, encryptionKey };

   urlString = "http://localhost:8060/api/v1/masterfileencryptor/decrypt-text";
   request = new Request(urlString, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(textObject)
   });

   doFetchForText(request);
}

// FETCH REQUEST FOR FILE
function doFetchForFile(request) {
   fetch(request)
      .then(response => {
         if (!response.ok) throw new Error(`Invalid response: ${response.status} - ${response.statusText}`);

         const disposition = response.headers.get("Content-Disposition");

         if (disposition && disposition.includes("attachment")) {
            // Extract filename using a regular expression
            const matches = /filename="(.+?)"/.exec(disposition);
            filename = matches ? matches[1] : 'downloaded-file';

            return response.blob();
         }
      })
      .then(blob => {
         const url = window.URL.createObjectURL(blob);
         generateDownloadLink(url, filename);
      })
      .catch(console.warn);
}

// FETCH REQUEST FOR PLAIN TEXT
function doFetchForText(request) {
   fetch(request)
      .then(response => {
         if (!response.ok) throw new Error(`Invalid response: ${response.status} - ${response.statusText}`);

         return response.text();
      })
      .then(textResult => {
         console.log(textResult);
         diaplayTextResult(textResult);
      })
      .catch(console.error);
}

function displayErrorMessage(errorMessage) {
   downloadSection.innerHTML = `<p>${errorMessage}</p>`;
   downloadSection.classList.add("error-message");
}

function generateDownloadLink(url, filename) {
   downloadSection.classList.contains("error-message") && downloadSection.classList.remove("password-error-message");

   downloadSection.innerHTML = `
      <p>Your file is ready!</p>
      <div class="download-link">
         <a href="${url}" download="${filename}">Download your file</a>
      </div>
   `;
}

function diaplayTextResult(textResult) {
   downloadSection.classList.contains("password-error-message") && downloadSection.classList.remove("password-error-message");

   downloadSection.innerHTML = `
      <div class="text-result-div">
         <p>Your text is ready!</p>
         <a class="copy-text-result js-copy-text-result" title="Copy result to Clipboard">
            <img src="images/icons/mycopy.svg" />
         </a>
         <p class="text-result">${textResult}</p>
      </div>
   `;

   document.querySelector(".js-copy-text-result").addEventListener("click", () => {
      const textResultArea = document.createElement("textarea");
      textResultArea.value = textResult;

      document.body.appendChild(textResultArea);
      textResultArea.select();
      document.execCommand("copy");

      document.body.removeChild(textResultArea);
   });
}
