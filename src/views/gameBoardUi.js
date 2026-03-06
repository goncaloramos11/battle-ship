import "../style/board.css";

export default function renderFleet(player) {
  const content = document.querySelector(".content");
  const fleet = document.createElement("div");
  fleet.classList.add("fleet");
  const title = document.createElement("div");
  title.classList.add("title");
  title.textContent = player.name;

  const board = document.createElement("div");
  board.classList.add("board");
  renderBoard(player, board);

  fleet.appendChild(title);
  fleet.appendChild(board);
  content.appendChild(fleet);
}

function renderBoard(player, board) {
  const totalSquares =
    player.gameboard.board.length * player.gameboard.board.length;

  for (let i = 0; i < totalSquares; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.dataset.y = Math.trunc(i / 10);
    square.dataset.x = i % 10;
    renderShip(square.dataset.x, square.dataset.y, square, player);
    board.appendChild(square);
  }
}

function renderShip(x, y, square, player) {
  if (
    player.gameboard.board[y][x] !== "miss" &&
    player.gameboard.board[y][x] !== ""
  ) {
    if (verifyPlayer(player)) square.classList.add("ship");
  }
}

function verifyPlayer(player) {
  return player.name === "Player" ? true : false;
}
