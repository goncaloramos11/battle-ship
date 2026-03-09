import "../style/board.css";
import attackController from "../controllers/playerController.js";
import npcAttackController from "../controllers/npcController.js";

let gameOver = false;
export default function renderFleet(player) {
  const content = document.querySelector(".content");
  const fleet = document.createElement("div");
  fleet.classList.add("fleet");
  const title = document.createElement("div");
  title.classList.add("title");
  title.textContent = player.name;

  const board = document.createElement("div");
  board.classList.add("board");
  renderBoard(player, board);

  fleet.appendChild(title);
  fleet.appendChild(board);
  content.appendChild(fleet);
}

export function renderStatus(player, type) {
  const status = document.querySelector(".status");

  switch (type) {
    case "gameover":
      status.textContent = `Game over! ${player.name} lost.`;
      gameOver = true;
      break;

    case "sunk":
      status.textContent = `${player.name}'s ship got sunk!`;
      break;

    case "hit":
      status.textContent = `${player.name} got hit!`;
      break;

    case "miss":
      status.textContent = `${player.name} dodged the attack!`;
      break;
  }
}

function renderBoard(player, board) {
  const totalSquares =
    player.gameboard.board.length * player.gameboard.board.length;

  for (let i = 0; i < totalSquares; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.dataset.y = Math.trunc(i / 10);
    square.dataset.x = i % 10;
    renderShip(square.dataset.x, square.dataset.y, square, player);
    board.appendChild(square);

    const x = square.dataset.x;
    const y = square.dataset.y;
    square.addEventListener("click", () => {
      if (gameOver || player.name == "Player") return;
      const result = attackController(player, x, y);

      if (result === null) return;

      square.classList.add(result ? "ship" : "miss");

      setTimeout(renderPlayerBoard, 1000);
    });
  }
}

function renderPlayerBoard() {
  const { result, x, y } = npcAttackController();

  const square = document.querySelector(
    `.square[data-x="${x}"][data-y="${y}"]`,
  );
  square.classList.add(result ? "ship" : "miss");
}

function renderShip(x, y, square, player) {
  if (
    player.gameboard.board[y][x] !== "miss" &&
    player.gameboard.board[y][x] !== ""
  ) {
    if (verifyPlayer(player)) square.classList.add("ship");
  }
}

function verifyPlayer(player) {
  return player.name === "Player" ? true : false;
}
