let formData;
let filename = "";

export const downloadSection = document.querySelector(".js-download-section");

export function encryptFile(file, encryptionKey, encryptionKey2) {
   if (encryptionKey !== encryptionKey2) {
      downloadSection.innerHTML = "<p>Encryption keys do not match!</p>";
      downloadSection.classList.add("password-error-message");
      return;
   }

   formData = new FormData();
   formData.append("file", file);
   formData.append("encryptionKey", encryptionKey);

   const urlString = "http://localhost:8060/api/v1/masterfileencryptor/encrypt";
   const request = new Request(urlString, { method: "POST", body: formData });

   doFetch(request);
}

export function decryptFile(file, encryptionKey) {
   formData = new FormData();
   formData.append("file", file);
   formData.append("encryptionKey", encryptionKey);

   const urlString = "http://localhost:8060/api/v1/masterfileencryptor/decrypt";
   const request = new Request(urlString, { method: "POST", body: formData });

   doFetch(request);
}

function doFetch(request) {
   fetch(request)
      .then(response => {
         console.log(response);
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

function generateDownloadLink(url, filename) {
   downloadSection.classList.contains("password-error-message") && downloadSection.classList.remove("password-error-message");

   downloadSection.innerHTML = `
      <p>Your file is ready!</p>
      <div class="download-link">
         <a href="${url}" download="${filename}">Download encrypted file</a>
      </div>
   `;
}