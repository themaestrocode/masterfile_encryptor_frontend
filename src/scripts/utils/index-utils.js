import { showProgressBar, hideProgressBar, downloadSection } from "./shared-utils.js";

let filename = "";

// FETCH REQUEST FOR FILE
export function doFetchForFile(request, operation) {
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
export function doFetchForText(request) {
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
         displayTextResult(textResult);
      })
      .catch(console.error);
}

export function displayErrorMessage(errorMessage) {
   downloadSection.innerHTML = `<p>${errorMessage}</p>`;
   downloadSection.classList.add("error-message");
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

function displayTextResult(textResult) {
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