const signinSection = document.querySelector(".js-signin-form-section");

renderLoginFormHTML();

function renderLoginFormHTML() {
   signinSection.innerHTML = `
      <form class="signin-form js-signin-form">
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
      <form class="signin-form js-signin-form">
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
}
