const progressBarSection = document.querySelector(".js-progress-bar-section-container");

export function showProgressBar () {
   progressBarSection.innerHTML = `
      <div class="progress-bar-section">
         <label for="progress-bar">Working on your file...</label><br>
         <progress id="progress-bar" class="progress-bar js-progress-bar" max="100"></progress>
      </div>
   `;
}

export function hideProgressBar () {
   progressBarSection.innerHTML = "";
}