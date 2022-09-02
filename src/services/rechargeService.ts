import { findByCardId } from "../repositories/rechargeRepository.js";

export async function getRecharges(cardId: number) {
  return await findByCardId(cardId);
}
