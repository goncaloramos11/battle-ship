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
  }

  placeShipXAxis(ship, x, y) {
    const horizontalLineLength = this.board[y].length;
    const end = x + ship.length;

    if (ship.length + x <= horizontalLineLength) {
      for (let i = x; i < end; i++) {
        this.board[y][i] = ship;
      }
    }
  }

  placeShipYAxis(ship, x, y) {
    const verticalLineLength = this.board.length;
    const end = y + ship.length;

    if (ship.length + y <= verticalLineLength) {
      for (let i = y; i < end; i++) {
        this.board[i][x] = ship;
      }
    }
  }

  getBoard() {
    return this.board;
  }
}
