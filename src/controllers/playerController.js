import { verifyAttackHandler } from "./gameController.js";

export default function attackController(player, x, y) {
  return verifyAttackHandler(player, x, y);
}
