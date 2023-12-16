import { loginUser, forgotPassword } from "../services/users.js";

export { loginForm };

function loginForm() {
  const loginForm = document.createElement("form");
  loginForm.id = "loginForm";

  loginForm.innerHTML = `
        

        <h2>Iniciar Sesión</h2>
        <div>
            <label for="email">Correo Electrónico:</label>
            <input type="email" id="email" name="email" required>
        </div>
        <div>
            <label for="password">Contraseña:</label>
            <input type="password" id="password" name="password" required>
        </div>
        <a href="#" id="forgot">I forgot my password</a>
        <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="remember">
            <label for="remember">Remember</label>
         </div>
        <button type="submit">Iniciar Sesión</button>
        <div id="errors"></div>
    `;

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = loginForm.querySelector("#email").value;
    const password = loginForm.querySelector("#password").value;
    loginUser(email, password).then((status) => {
      if (status.success) window.location.hash = "#/";
      else {
        loginForm.querySelector("#errors").innerHTML = status.errorText;
      }
    });
  });

  loginForm.querySelector("#forgot").addEventListener("click", (event) => {
    event.preventDefault();
    const email = loginForm.querySelector("#email").value;
    forgotPassword(email);
    event.target.parentElement.append("You have an Email");
  });

  return loginForm;
}
