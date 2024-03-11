export const formSection = document.querySelector(".js-form-section");
export const downloadSection = document.querySelector(".js-download-section");

export function showProgressBar () {
   formSection.innerHTML = `
      <div class="progress-bar-section">
         <label for="progress-bar">Working on your file...</label><br>
         <progress id="progress-bar" class="progress-bar js-progress-bar" max="100"></progress>
      </div>
   `;
}

export function hideProgressBar () {
   formSection.innerHTML = "";
}