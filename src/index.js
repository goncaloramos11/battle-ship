import "./style/structure.css";
import { manageGame } from "./controllers/gameController.js";
import { restartGame } from "./views/gameBoardUi.js";
const restart = document.querySelector(".restart-btn");
restart.addEventListener("click", restartGame);

manageGame();
