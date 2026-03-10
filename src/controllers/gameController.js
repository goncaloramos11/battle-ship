import renderBoardController from "./gameBoardController.js";
import { Gameboard } from "../models/Gameboard.js";
import { Ship } from "../models/Ship.js";
import { Player } from "../models/Player.js";
import { renderStatus } from "../views/gameBoardUi.js";

let currentTarget = "NPC";
let playerTarget = null;

export function manageGame() {
  const { player, npc } = players();
  playerTarget = player;
  renderBoardController(player, npc);
}

export function restartGameController() {
  currentTarget = "NPC";
  manageGame();
}

export function verifyAttackHandler(player, x, y) {
  if (player.name !== currentTarget) return null;

  if (player.gameboard.attacks.has(`${x},${y}`)) return null;
  const result = player.gameboard.receiveAttack(x, y);
  manageStatus(player, result, x, y);

  switchTurn();

  return result;
}

function manageStatus(player, result, x, y) {
  if (result) {
    if (player.gameboard.board[y][x].isSunk()) {
      renderStatus(player, "sunk");
    } else {
      renderStatus(player, "hit");
    }

    if (player.gameboard.ships.every((ship) => ship.isSunk())) {
      renderStatus(player, "gameover");
    }
  } else {
    renderStatus(player, "miss");
  }
}

function players() {
  const gameboard1 = new Gameboard();
  const gameboard2 = new Gameboard();
  const player = new Player(gameboard1, "Player");
  const npc = new Player(gameboard2, "NPC");

  const max_length = 5;

  for (let i = 1; i <= max_length; i++) {
    const ship = new Ship(i);
    placeRandomShip(gameboard1, ship);
  }

  for (let i = 1; i <= max_length; i++) {
    const ship = new Ship(i);
    placeRandomShip(gameboard2, ship);
  }

  return { player, npc };
}

function switchTurn() {
  currentTarget = currentTarget === "Player" ? "NPC" : "Player";
}

function placeRandomShip(gameboard, ship) {
  let placed = false;

  while (!placed) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    const direction = Math.random() < 0.5 ? "x" : "y";

    placed = gameboard.placeShip(ship, x, y, direction);
  }
}

export function NPCAttackHandler() {
  let x, y;

  do {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
  } while (playerTarget.gameboard.attacks.has(`${x},${y}`));

  const result = playerTarget.gameboard.receiveAttack(x, y);
  manageStatus(playerTarget, result, x, y);
  switchTurn();
  return { result, x, y };
}
