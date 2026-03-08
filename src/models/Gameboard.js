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

  placeShipXAxis(ship, x, y) {
    const horizontalLineLength = this.board[y].length;
    const end = x + ship.length;

    if (ship.length + x <= horizontalLineLength) {
      for (let i = x; i < end; i++) {
        this.board[y][i] = ship;
      }
    }
    this.ships.push(ship);
  }

  placeShipYAxis(ship, x, y) {
    const verticalLineLength = this.board.length;
    const end = y + ship.length;

    if (ship.length + y <= verticalLineLength) {
      for (let i = y; i < end; i++) {
        this.board[i][x] = ship;
      }
    }
    this.ships.push(ship);
  }

  receiveAttack(x, y) {
    let target = this.board[y][x];
    if (target === "" || target === "miss") {
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
