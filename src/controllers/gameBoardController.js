import { Gameboard } from "../models/Gameboard.js";
import { Ship } from "../models/Ship.js";
import renderFleet from "../views/gameBoardUi.js";
import { Player } from "../models/Player.js";

export default function renderBoardController() {
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

  renderFleet(player);
  renderFleet(npc);
}
