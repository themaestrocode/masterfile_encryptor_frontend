import { renderEncryptionHTML, renderTextEncryptionHTML } from "../service/encryption-service.js";
import { renderDecryptionHTML, renderTextDecryptionHTML } from "../service/decryption-service.js";

renderEncryptionHTML();

document.querySelector(".js-encrypt-file").addEventListener("click", () => renderEncryptionHTML());
document.querySelector(".js-decrypt-file").addEventListener("click", () => renderDecryptionHTML());
document.querySelector(".js-encrypt-text").addEventListener("click", () => renderTextEncryptionHTML());
document.querySelector(".js-decrypt-text").addEventListener("click", () => renderTextDecryptionHTML());

const copyButton = document.querySelector(".js-copy-cb");
copyButton.style.cursor = "pointer";
copyButton.addEventListener("click", () => {
   // Create a temporary textarea element to facilitate copying
   const textarea = document.createElement('textarea');
   textarea.value = "https://mfe-puce.vercel.app";
   // Append the textarea to the document
   document.body.appendChild(textarea);
   // Select the text in the textarea
   textarea.select();
   // Execute the copy command
   document.execCommand("copy");
   // Remove the temporary textarea
   document.body.removeChild(textarea);
});
