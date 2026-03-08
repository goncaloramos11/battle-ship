import renderBoardController from "./gameBoardController.js";
import { Gameboard } from "../models/Gameboard.js";
import { Ship } from "../models/Ship.js";
import { Player } from "../models/Player.js";
import { renderStatus } from "../views/gameBoardUi.js";

let totalSunk = 0;
let currentTurn_receiveAttack = "NPC";

export function manageGame() {
  const { player, npc } = players();

  renderBoardController(player, npc);
}

export function verifyAttackHandler(player, x, y) {
  if (player.name !== currentTurn_receiveAttack) return null;

  const result = player.gameboard.receiveAttack(x, y);
  manageStatus(player, result, x, y);

  switchTurn();
  return result;
}

function manageStatus(player, result, x, y) {
  if (result) {
    if (player.gameboard.board[y][x].isSunk()) {
      totalSunk++;
      renderStatus(player, "sunk");
    } else {
      renderStatus(player, "hit");
    }

    if (player.gameboard.ships.length === totalSunk) {
      renderStatus(player, "gameover");
    }
  } else {
    renderStatus(player, "miss");
  }
}

function players() {
  const gameboard1 = new Gameboard();
  const ship_p1_1 = new Ship(4);
  const ship_p1_2 = new Ship(1);

  gameboard1.placeShipXAxis(ship_p1_1, 0, 0);
  gameboard1.placeShipYAxis(ship_p1_2, 9, 7);

  const gameboard2 = new Gameboard();
  const ship_p2_1 = new Ship(3);
  const ship_p2_2 = new Ship(2);

  const player = new Player(gameboard1, "Player");
  const npc = new Player(gameboard2, "NPC");

  gameboard2.placeShipXAxis(ship_p2_1, 0, 0);
  gameboard2.placeShipYAxis(ship_p2_2, 9, 7);

  return { player, npc };
}

function switchTurn() {
  currentTurn_receiveAttack =
    currentTurn_receiveAttack === "Player" ? "NPC" : "Player";
}
