import { findByCardId } from "../repositories/rechargeRepository";

export async function getRecharges(cardId: number) {
  return await findByCardId(cardId);
}
