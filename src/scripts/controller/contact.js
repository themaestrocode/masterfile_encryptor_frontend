document.querySelector(".js-contact-form").addEventListener("submit", (event) => {
   event.preventDefault();

   const sender = document.querySelector(".js-full-name").value;
   const email = document.querySelector(".js-email").value;
   const message = document.querySelector(".js-message").value;

   if (!validateSenderDetails(sender, email, message)) return;

   sendMessage({ sender, email, message });
});

function sendMessage(messageFormData) {
   const formData = new FormData();
   formData.append("sender", messageFormData.sender);
   formData.append("email", messageFormData.email);
   formData.append("message", messageFormData.message);

   const urlString = "https://masterfileencryptorapi.onrender.com/api/v1/send-message";
   const request = new Request(urlString, { method: "POST", body: formData});

   fetch(request)
      .then(response => {
         let validResponse = false;

         if (response.ok && response.status === 200) validResponse = true;
         else displayMessageOutcome("Message failed to send!", false);

         if (!validResponse) throw new Error(`Invalid response: ${response.status} - ${response.statusText}`);
         
         displayMessageOutcome("Message successfully sent", true);
      })
      .catch(console.error);
}

function displayMessageOutcome(message, success) {
   const outcome = document.querySelector(".js-outcome");
   outcome.style.color = success === true? "green" : "red";
   outcome.innerHTML = `<p>${message}</p>`;
}

function validateSenderDetails(sender, email, message) {
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   if (sender.trim().length === 0) {
      alert("name cannot be empty!");
      return false;
   } else if (!emailRegex.test(email)) {
      alert("invalid email!");
      return false;
   } else if (message.trim().length === 0 || message.length < 5) {
      alert("message too short!");
      return false;
   }
   
   return true;
}
