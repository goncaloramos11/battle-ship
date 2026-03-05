export class Ship {
  constructor(length) {
    this.length = length;
    this.hitTimes = 0;
    this.sunk = false;
  }

  hit() {
    this.hitTimes++;
  }

  isSunk() {
    this.sunk = this.hitTimes === this.length;
    return this.sunk;
  }
}
