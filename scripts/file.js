export function encryptFile(file, encryptionKey, downloadSection) {
   const formData = new FormData();
   formData.append("file", file);
   formData.append("encryptionKey", encryptionKey);
   let filename = "";

   const urlString = "http://localhost:8060/api/v1/masterfileencryptor/encrypt";
   const request = new Request(urlString, { method: "POST", body: formData });

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

         generateDownloadLink(url, filename, downloadSection);
      })
      .catch(console.warn);
}

function generateDownloadLink(url, filename, downloadSection) {
   downloadSection.classList.contains("password-error-message") && downloadSection.classList.remove("password-error-message");

   downloadSection.innerHTML = `
      <p>Your file is ready!</p>
      <div class="download-link">
         <a href="${url}" download="${filename}">Download encrypted file</a>
      </div>
   `;
}