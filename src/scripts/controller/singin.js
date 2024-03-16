const signinSection = document.querySelector(".js-signin-form-section");
const signinAttemptMessage = document.querySelector(".js-signin-attempt-message");

renderLoginFormHTML();

function renderLoginFormHTML() {
   signinSection.innerHTML = `
      <form class="login-form js-login-form">
         <label for="email">Email</label><br>
         <input id="email" class="email js-email" type="email" placeholder="Enter your email address"><br>

         <label for="password">Password</label><br>
         <input id="password" class="password js-password" type="password" placeholder="Enter your password"><br>

         <button class="login-button js-login-button" type="submit">Log in</button>
      </form>

      <div class="signup-instead">
         <p>Don't have an account?<br> <a class="signup-suggestion js-signup-suggestion">Sign up for free</a></p>
      </div>
   `;

   document.querySelector(".js-signup-suggestion").addEventListener("click", () => renderSignupFormHTML());
}

function renderSignupFormHTML() {
   signinSection.innerHTML = `
      <form class="signup-form js-signup-form">
         <label for="email">Email</label><br>
         <input id="email" class="email js-email" type="email" placeholder="Enter your email address"><br>

         <label for="password">Password</label><br>
         <input id="password" class="password js-password" type="password" placeholder="Provide a strong password"><br>

         <label for="confirm-password">Confirm password</label><br>
         <input id="confirm-password" class="confirm-password js-confirm-password" type="password" placeholder="Enter the password again"><br>

         <button class="signup-button js-signup-button" type="submit">Sign up</button>
      </form>

      <div class="login-instead">
         <p>Already have an account?<br> <a class="login-suggestion js-login-suggestion">Login</a></p>
      </div>
   `;

   document.querySelector(".js-login-suggestion").addEventListener("click", () => renderLoginFormHTML());

   document.querySelector(".js-signup-form").addEventListener("submit", (event) => {
      event.preventDefault();

      const email = document.querySelector(".js-email");
      const password = document.querySelector(".js-password");
      const confirmPassword = document.querySelector(".js-confirm-password");

      if (!validateUserRegistrationData(email.value, password.value, confirmPassword.value)) return;

      const userDetailsObject = { email: email.value, password: password.value };
      registerUser(userDetailsObject);
   });
}

function registerUser(userDetailsObject) {
   console.log(userDetailsObject);

   const urlString = "http://localhost:8060/api/v1/masterfileencryptor/sign-up";
   const request = new Request(urlString, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDetailsObject)
   });

   fetch(request)
      .then(response => {
         console.log(response);
         let validResponse = false;

         if (response.ok && response.status === 201) validResponse = true;
         else if (response.status === 409) displaySigninAttemptFailedMessage("This email is registered with another user.");
         else displaySigninAttemptFailedMessage("Some error occured. Registration failed!");

         if (!validResponse) throw new Error(`Invalid response: ${response.status} - ${response.statusText}`);

         return response.json();
      })
      .then(() => displaySigninAttemptSuccessMessage())
      .catch(console.error);
}

function validateUserRegistrationData(email, password, confirmPassword) {
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   if (!emailRegex.test(email)) {
      displaySigninAttemptFailedMessage("invalid email address!");
      return false;
   } else if (password.trim().length === 0 || password.length < 8) {
      displaySigninAttemptFailedMessage("Password must be at least 8 characters longs.");
      return false;
   } else if ((password.match(/[a-z]/g) || []).length < 1) { // checking for lowercase character in the password
      displaySigninAttemptFailedMessage("Password must contain at least 1 lowercase character.");
      return false;
   } else if ((password.match(/[A-Z]/g) || []).length < 1) { // checking for uppercase character in the password
      displaySigninAttemptFailedMessage("password must contain at least 1 uppercase character.");
      return false;
   } else if ((password.match(/[0-9]/g) || []).length < 1) { // checking for number in the password
      displaySigninAttemptFailedMessage("Password must contain at least 1 number.");
      return false;
   } else if (password !== confirmPassword) {
      displaySigninAttemptFailedMessage("Passwords do not match. Check and try again.");
      return false;
   }

   return true;
}

function displaySigninAttemptFailedMessage(message) {
   signinAttemptMessage.innerHTML = `<p class="error-message">${message}</p>`;
}

function displaySigninAttemptSuccessMessage() {
   signinAttemptMessage.innerHTML = `
      <p class="success-message">
         <img src="icons/checkmark.png"><br>
         Your account has been successfully created and a verification link has been sent to your email.
         The link is valid for 30 minutes only.
      </p>
   `;
}