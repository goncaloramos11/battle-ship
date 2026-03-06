import "../style/board.css";

export default function renderBoard() {
  const totalSquares = 100;
  const boards = document.querySelectorAll(".board");

  boards.forEach((board) => {
    board.innerHTML = "";
    for (let i = 0; i < totalSquares; i++) {
      const square = document.createElement("div");
      square.classList.add("square");
      board.appendChild(square);
    }
  });
}
