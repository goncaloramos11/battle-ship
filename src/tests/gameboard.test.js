import { Gameboard } from "../models/Gameboard.js";
import { Ship } from "../models/Ship.js";

test("Test to create a Ship Object", () => {
  const gameboard = new Gameboard();
  expect(gameboard).toBeDefined();
});

test("Test placing a ship by X Axis", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);
  gameboard.placeShipXAxis(ship, 7, 0);

  const board = gameboard.getBoard();

  expect(board[0][7]).toBe(ship);
  expect(board[0][8]).toBe(ship);
  expect(board[0][9]).toBe(ship);
});

test("Test failing to place a ship by X Axis", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);
  gameboard.placeShipXAxis(ship, 8, 0);

  const board = gameboard.getBoard();

  expect(board[0][7]).toBe("");
  expect(board[0][8]).toBe("");
  expect(board[0][9]).toBe("");
});

test("Test placing a ship by Y Axis", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);
  gameboard.placeShipYAxis(ship, 0, 7);

  const board = gameboard.getBoard();

  expect(board[7][0]).toBe(ship);
  expect(board[8][0]).toBe(ship);
  expect(board[9][0]).toBe(ship);
});

test("Test failing to place a ship by Y Axis", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);
  gameboard.placeShipYAxis(ship, 0, 8);

  const board = gameboard.getBoard();

  expect(board[0][0]).toBe("");
  expect(board[1][0]).toBe("");
  expect(board[2][0]).toBe("");
});
