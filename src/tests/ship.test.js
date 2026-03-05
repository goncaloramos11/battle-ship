import { Ship } from "../models/Ship.js";

test("Test to create a Ship Object", () => {
  const ship = new Ship(2);
  expect(ship).toBeDefined();
  expect(ship.length).toBe(2);
  expect(ship.hitTimes).toBe(0);
  expect(ship.sunk).toBe(false);
});

test("Test the hit method", () => {
  const ship = new Ship(5);
  ship.hit();
  expect(1).toBe(ship.hitTimes);
});

test("Test the sunk method and should return true", () => {
  const ship = new Ship(3);
  ship.hit();
  ship.hit();
  ship.hit();

  expect(ship.isSunk()).toBeTruthy();
});

test("Test the sunk method and should return false", () => {
  const ship = new Ship(3);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBeFalsy();
});
