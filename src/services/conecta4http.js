import { updateData, createData, getData } from "./http.js";

export { saveGame, updateGame, getGame };

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlodW9zaHp5bm9tZXpsanR5Ynh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI1ODExNTgsImV4cCI6MjAxODE1NzE1OH0.6rbdtoapW3Uo6KDLc1UD6kmVHOMlgU63zc1AEyjq-dI"; // Reemplaza con tu clave de Supabase

function saveGame(boardState, currentPlayer, isGameActive) {
  const token = localStorage.getItem("access_token");
  const newGame = createData("ConnectFourGame", token, {
    board_state: boardState,
    current_player: currentPlayer,
    is_game_active: isGameActive,
  });
  return newGame; // Retorna la promesa
}

async function updateGame(boardState, gameId) {
  const token = localStorage.getItem("access_token");
  await updateData(`ConnectFourGame?id=eq.${gameId}`, token, {
    board_state: boardState,
  });
}

async function getGame(gameId) {
  const token = localStorage.getItem("access_token");
  const game = await getData(`ConnectFourGame?id=eq.${gameId}`, token);
  return game[0];
}

// Otras funciones pueden seguir un patrón similar (ejemplo: getAllGames, getAvailableGames, etc.)
