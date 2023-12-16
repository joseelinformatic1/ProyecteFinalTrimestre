export { initializeGame };

let currentPlayer = 1;
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];

// Función para inicializar el juego de Tres en Raya
function initializeGame() {
  currentPlayer = 1;
  gameActive = true;
  board = ['', '', '', '', '', '', '', '', ''];

  const main = document.querySelector("#container"); // Suponiendo que el contenedor principal se llama 'container'
  const gameBoard = document.createElement("div");
  gameBoard.classList.add("tresenraya-board");

  // Crea las celdas del tablero
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("tresenraya-cell");
    cell.setAttribute("data-index", i);
    cell.addEventListener("click", cellClicked);
    gameBoard.appendChild(cell);
  }

  // Agrega el tablero al contenedor principal
  main.innerHTML = "";
  main.appendChild(gameBoard);

  updateStatus();
}

// Función para manejar el clic en una celda
function cellClicked(event) {
  const index = event.target.getAttribute("data-index");
  if (gameActive && board[index] === '') {
    board[index] = currentPlayer === 1 ? 'X' : 'O';
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    updateStatus();
  }
}

// Función para actualizar el estado del juego y el tablero visualmente
function updateStatus() {
    const cells = document.querySelectorAll(".tresenraya-cell");
    cells.forEach((cell, index) => {
      cell.textContent = board[index] || ''; // Limpia el texto si no hay jugador
    });
  
    const status = document.querySelector(".tresenraya-status");
    if (status) {
      status.remove(); // Elimina el estado anterior si existe
    }
  
    const newStatus = document.createElement("div");
    newStatus.classList.add("tresenraya-status");
  
    // Lógica para verificar victoria o empate
    const winner = checkForWin();
    if (winner) {
      gameActive = false;
      newStatus.textContent = `Player ${winner} wins!`;
    } else if (board.every(cell => cell !== '')) {
      gameActive = false;
      newStatus.textContent = "It's a draw!";
    } else {
      newStatus.textContent = `Player ${currentPlayer}'s turn`;
    }
  
    // Muestra el estado del juego en pantalla
    const main = document.querySelector("#container");
    main.appendChild(newStatus);
  }
  

// Función para verificar la victoria
function checkForWin() {
    const winningConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
  
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

// Función para reiniciar el juego
function restartGame() {
    currentPlayer = 1;
    gameActive = true;
    board = ['', '', '', '', '', '', '', '', ''];
    updateStatus();
  }
  
  // Función para inicializar el juego cuando se carga la página
  window.onload = function () {
    initializeGame();
    
    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart Game";
    restartButton.addEventListener("click", restartGame);
    
    const main = document.querySelector("#container");
    main.appendChild(restartButton);
  };