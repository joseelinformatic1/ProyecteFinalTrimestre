export {
  initializeGame,
  createEmptyBoard,
  createBoard,
  checkForWin,
  checkForDraw,
  checkDirection
};

let currentPlayer = 1;
let gameActive = true;

const gameState = {
  currentPlayer: 1, // Jugador actual (1 o 2)
  board: [], // Matriz que representa el tablero
  gameActive: true, // Indicador si el juego sigue activo o ha terminado
};

// Función para inicializar el gameState y el tablero
function initializeGame() {
  gameState.currentPlayer = 1;
  gameState.board = createEmptyBoard(); // Función para crear un tablero vacío
  gameState.gameActive = true;

  let padre = document.createElement("div");
  padre.id = "father";

  const boardContainer = document.createElement("div");
  boardContainer.id = "board";

  // Agrega el tablero al contenedor principal (por ejemplo, el body)
  const main = document.querySelector("#container"); // Asegúrate de tener el contenedor principal
  main.appendChild(padre);
  padre.appendChild(boardContainer);

  // Crea el tablero en el elemento 'board'
  createBoard(boardContainer);

  boardContainer.addEventListener("click",(e) =>{
    if (!gameActive) return;
      
    const column = e.target.dataset.column;
    const row = getLowestEmptyRow(column);
  
    if (row !== -1) {
      const cell = document.querySelector(
        `[data-column="${column}"][data-row="${row}"]`
      );
      const playerClass = currentPlayer === 1 ? "player1" : "player2";
      cell.classList.add(playerClass);
  
      if (checkForWin(row, column)) {
        gameActive = false;
        alert(`¡El jugador ${currentPlayer === 1 ? "1" : "2"} ha ganado!`);
      } else if (checkForDraw()) {
        gameActive = false;
        alert("¡Empate!");
      } else {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
      }
    }
  })
}

// Función para crear un tablero vacío (matriz de 6x7)
function createEmptyBoard() {
  const board = [];
  for (let i = 0; i < 6; i++) {
    board.push(Array.from({ length: 7 }, () => 0)); // Inicializar con ceros
  }
  return board;
}

// Ejemplo de estructura del gameState:

console.log(gameState);

// Crear la función createBoard() que genera el tablero en el elemento con ID 'board'
// Función para crear el tablero
function createBoard(boardContainer) {
  const columns = 7;
  const rows = 6;
  for (let i = 0; i < columns * rows; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.column = i % columns;
    cell.dataset.row = Math.floor(i / columns);
    boardContainer.appendChild(cell);

  }
}

// Función que retorna la fila más baja vacía en una columna
const getLowestEmptyRow = (column) => {
  const cells = Array.from(
    document.querySelectorAll(`[data-column="${column}"]`)
  );
  for (let i = cells.length - 1; i >= 0; i--) {
    if (
      !cells[i].classList.contains("player1") &&
      !cells[i].classList.contains("player2")
    ) {
      return cells[i].dataset.row;
    }
  }
  return -1;
};

// Función que verifica si hay cuatro en línea en una dirección
function checkForWin(row, column) {
  const currentPlayerClass = currentPlayer === 1 ? "player1" : "player2";

  // Verificar horizontalmente
  if (
    checkDirection(row, column, 0, 1, currentPlayerClass) +
      checkDirection(row, column, 0, -1, currentPlayerClass) >=
    3
  ) {
    return true;
  }

  // Verificar verticalmente
  if (checkDirection(row, column, 1, 0, currentPlayerClass) >= 3) {
    return true;
  }

  // Verificar diagonalmente hacia arriba
  if (
    checkDirection(row, column, 1, 1, currentPlayerClass) +
      checkDirection(row, column, -1, -1, currentPlayerClass) >=
    3
  ) {
    return true;
  }

  // Verificar diagonalmente hacia abajo
  if (
    checkDirection(row, column, -1, 1, currentPlayerClass) +
      checkDirection(row, column, 1, -1, currentPlayerClass) >=
    3
  ) {
    return true;
  }

  return false;
}

// Función que verifica si hay un empate
function checkDirection(
  row,
  column,
  rowOffset,
  columnOffset,
  currentPlayerClass
) {
  let count = 0;

  // Verificar hacia adelante
  for (let i = 1; i < 4; i++) {
    const newRow = parseInt(row, 10) + i * rowOffset;
    const newColumn = parseInt(column, 10) + i * columnOffset;

    const cell = document.querySelector(
      `[data-row="${newRow}"][data-column="${newColumn}"]`
    );

    if (cell && cell.classList.contains(currentPlayerClass)) {
      count++;
    } else {
      break;
    }
  }

  return count;
}

// Función que verifica si hay un empate
function checkForDraw() {
  const cells = document.querySelectorAll(".cell");
  for (let i = 0; i < cells.length; i++) {
    if (
      !cells[i].classList.contains("player1") &&
      !cells[i].classList.contains("player2")
    ) {
      return false; // Todavía hay celdas vacías
    }
  }
  return true; // No hay celdas vacías, empate
}



function showGameResult(winner) {
  const resultContainer = document.createElement("div");
  resultContainer.classList.add("game-result");

  const resultText = document.createElement("div");
  resultText.textContent = winner === 1 ? "¡El jugador 1 ha ganado!" : "¡El jugador 2 ha ganado!";
  resultText.classList.add("result-text");

  resultContainer.appendChild(resultText);
  document.getElementById("father").appendChild(resultContainer);

  resultContainer.style.backgroundColor = winner === 1 ? "#e74c3c" : "#1264f3";
}

