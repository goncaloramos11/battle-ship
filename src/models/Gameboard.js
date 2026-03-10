export class Gameboard {
  constructor() {
    this.board = [
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
    ];
    this.ships = [];
    this.attacks = new Set();
  }

  placeShip(ship, x, y, direction) {
    const size = this.board.length;

    for (let i = 0; i < ship.length; i++) {
      const newX = direction === "x" ? x + i : x;
      const newY = direction === "y" ? y + i : y;

      if (newX >= size || newY >= size) return false;

      if (this.board[newY][newX] !== "") return false;
    }

    for (let i = 0; i < ship.length; i++) {
      const newX = direction === "x" ? x + i : x;
      const newY = direction === "y" ? y + i : y;

      this.board[newY][newX] = ship;
    }

    this.ships.push(ship);
    return true;
  }

  receiveAttack(x, y) {
    const key = `${x},${y}`;

    if (this.attacks.has(key)) return null;

    this.attacks.add(key);

    const target = this.board[y][x];

    if (target === "") {
      return false;
    } else {
      target.hit();
      return true;
    }
  }

  hasBeenAttacked(x, y) {
    return this.attacks.has(`${x},${y}`);
  }

  getBoard() {
    return this.board;
  }
}
