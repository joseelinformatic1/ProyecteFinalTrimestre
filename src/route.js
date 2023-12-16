import { home } from "./views/home.js";
import { loginForm } from "./views/login.js";
import { registerForm } from "./views/register.js";
import { logout } from "./services/users.js";
import * as QuatroenRaya from "./4enRaya.js";
import {initializeGame} from './TresenRaya.js';

export { route };

function route(ruta) {
  console.log({ ruta });
  let params = ruta.split("?")[1];
  params = params
    ? new Map(
        params.split("&").map((param) => {
          const paramArray = param.split("=");
          return [paramArray[0], paramArray[1]];
        })
      )
    : new Map();
  console.log({ params });
  ruta = ruta.split("?")[0];
  const main = document.querySelector("#container");

  switch (ruta) {
    case "#/":
      main.innerHTML = "";
      main.append(home());
      break;
    case "#/login":
      main.innerHTML = "";
      main.append(loginForm());
      break;
    case "#/connectFour":
      main.innerHTML = ""; // Limpia el contenido actual
      QuatroenRaya.initializeGame();
      break;
    case "#/tresenRaya":
      main.innerHTML = "";
      main.append(initializeGame());
      break;
    case "#/register":
      main.innerHTML = "";
      main.append(registerForm());
      break;
    case "#/logout":
      logout();
      window.location.hash = "#/";
      break;
    case "#/profile":
      main.innerHTML = "";
      main.append(profileForm());
      break;
    case "":
      window.location.hash = "#/";
      break;
    default:
      window.location.hash = "#/";
  }
}
