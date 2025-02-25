export const formSection = document.querySelector(".js-form-section");
export const downloadSection = document.querySelector(".js-download-section");
export const switchTheme = document.querySelector(".js-switch-theme");

export const menuIcon = document.querySelector(".js-menu-icon");
export const canceIcon = document.querySelector(".js-cancel-icon");
export const sidebar = document.querySelector(".js-sidebar");
export const mainSection = document.querySelector("main");

export function showProgressBar () {
   formSection.innerHTML = `
      <div class="progress-bar-section">
         <label for="progress-bar">Processing your request...</label><br>
         <progress id="progress-bar" class="progress-bar js-progress-bar" max="100"></progress>
      </div>
   `;
}

export function hideProgressBar () {
   formSection.innerHTML = "";
}
