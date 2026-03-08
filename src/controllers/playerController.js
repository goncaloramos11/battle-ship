import { verifyAttackHandler } from "./gameController.js";

export default function attackController(player, x, y) {
  console.log("Verify if Player: " + player.name + " receive the attack");

  return verifyAttackHandler(player, x, y);
}
