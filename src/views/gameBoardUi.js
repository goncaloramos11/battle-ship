import "../style/board.css";

export default function renderBoard() {
  const totalSquares = 100;
  const board = document.querySelectorAll(".board");

  board.forEach((board) => {
    for (let i = 0; i < totalSquares; i++) {
      const square = document.createElement("div");
      square.setAttribute("class", "square");
      board.appendChild(square);
    }
  });
}
