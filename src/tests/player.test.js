import { Gameboard } from "../models/Gameboard.js";
import { Player } from "../models/Player.js";

test("Test to create a PLayer Object", () => {
  const gameboard = new Gameboard();
  const player = new Player(gameboard);
  expect(player).toBeDefined();
  expect(player.gameboard).toBe(gameboard);
});
