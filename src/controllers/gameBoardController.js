import renderFleet from "../views/gameBoardUi.js";

export default function renderBoardController(player, npc) {
  renderFleet(player);
  renderFleet(npc);
}
