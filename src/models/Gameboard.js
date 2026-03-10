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
    let target = this.board[y][x];
    if (target === "miss") return;
    if (target === "") {
      this.board[y][x] = "miss";
      return false;
    } else {
      target.hit();
      return true;
    }
  }

  getBoard() {
    return this.board;
  }
}
