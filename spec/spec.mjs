import { initializeGame,
    createEmptyBoard,
    checkForWin,
    checkForDraw} from "../src/4enRaya.js"

describe("Connect Four Game", function () {
  // Prueba para verificar la creación de un tablero vacío
  it("should create an empty board", function () {
    const emptyBoard = createEmptyBoard();
    expect(emptyBoard.length).toBe(6); // Verifica la cantidad de filas
    expect(emptyBoard[0].length).toBe(7); // Verifica la cantidad de columnas
    // Aquí puedes agregar más expectativas según lo necesario para asegurar un tablero vacío
  });

  // Prueba para verificar si hay un empate
  it("should detect a draw", function () {
    const drawBoard = [
      [1, 2, 1, 2, 1, 2, 1],
      [2, 1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2, 1],
      [2, 1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2, 1],
      [2, 1, 2, 1, 2, 1, 2],
    ];
    gameState.board = drawBoard;
    expect(checkForDraw()).toBe(true);
  });

  // Prueba para verificar la lógica de victoria horizontal
  it("should detect horizontal win", function () {
    const horizontalWinBoard = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0],
      [2, 2, 2, 0, 0, 0, 0],
    ];
    gameState.board = horizontalWinBoard;
    expect(checkForWin(4, 3)).toBe(true); // Verifica una victoria en la fila 5, columna 4
  });
  describe("Tic Tac Toe Game", function () {
    beforeEach(function () {
      initializeGame(); // Inicializa el juego antes de cada prueba
    });

    it("should initialize the game correctly", function () {
      // Verifica que el juego se inicialice con el tablero vacío y el primer jugador
      expect(gameActive).toBe(true);
      expect(currentPlayer).toBe(1);
      expect(board.every((cell) => cell === "")).toBe(true);
    });

    it("should handle cell click and change turns", function () {
      const cell = document.querySelector(".tresenraya-cell");
      cell.click(); // Simula un clic en una celda

      // Verifica si la celda se actualiza y cambia el turno
      expect(board[0]).toBe("X");
      expect(currentPlayer).toBe(2);

      // Aquí podrías añadir más expectativas según la lógica del juego
    });

    it("should detect a win or a draw", function () {
      // Simula un escenario de victoria o empate
      board = ["X", "O", "X", "O", "X", "O", "O", "X", "O"];
      updateStatus(); // Actualiza el estado del juego basado en el tablero

      // Verifica si se detecta correctamente la victoria o el empate
      expect(gameActive).toBe(false);
      expect(document.querySelector(".tresenraya-status").textContent).toBe(
        "It's a draw!"
      );
    });

    // Puedes agregar más pruebas para cubrir otras funcionalidades del juego
  });
});
