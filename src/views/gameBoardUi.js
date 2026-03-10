import "../style/board.css";
import attackController from "../controllers/playerController.js";
import npcAttackController from "../controllers/npcController.js";
import { restartGameController } from "../controllers/gameController.js";

let gameOver = false;
export default function renderFleet(player) {
  const abc = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const _123 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const content = document.querySelector(".content");
  const fleet = document.createElement("div");
  fleet.classList.add("fleet");
  const title = document.createElement("div");
  const letters = document.createElement("div");
  letters.classList.add("letters");
  const numbers = document.createElement("div");
  numbers.classList.add("numbers");

  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");

  const ul_letters = document.createElement("ul");
  letters.appendChild(ul_letters);
  abc.map((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    ul_letters.appendChild(li);
  });

  const ul_numbers = document.createElement("ul");
  numbers.appendChild(ul_numbers);
  _123.map((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    ul_numbers.appendChild(li);
  });

  if (player.name === "NPC") {
    title.classList.add("title-npc");
  } else {
    title.classList.add("title");
  }
  title.textContent = player.name;

  const board = document.createElement("div");
  board.classList.add("board");
  renderBoard(player, board);

  wrapper.appendChild(numbers);
  wrapper.appendChild(board);

  fleet.appendChild(title);
  fleet.appendChild(letters);

  fleet.appendChild(wrapper);

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
      if (gameOver) return;
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
  if (result) {
    square.textContent = "X";
  }
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

export function restartGame() {
  const content = document.querySelector(".content");
  const status = document.querySelector(".status");
  status.textContent = "Guess to start the game!";
  content.innerHTML = "";
  gameOver = false;
  restartGameController();
}
