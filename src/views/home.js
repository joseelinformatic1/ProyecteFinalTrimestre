export { home };

function home() {
  const homeContainer = document.createElement("div");
  homeContainer.classList.add("home-container");

  const welcomeMessage = document.createElement("h1");
  welcomeMessage.textContent = "¡Bienvenido a nuestro sitio web!";

  const description = document.createElement("p");
  description.textContent =
    "Aquí puedes encontrar una variedad de juegos divertidos para disfrutar.";

  homeContainer.appendChild(welcomeMessage);
  homeContainer.appendChild(description);

  return homeContainer;
}
