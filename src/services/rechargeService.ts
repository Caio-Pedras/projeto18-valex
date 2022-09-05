import { findById } from "../repositories/cardRepository.js";
import { findByCardId, insert } from "../repositories/rechargeRepository.js";
import { validateExpirationDate } from "./cardService.js";

export async function getRecharges(cardId: number) {
  const card = await findById(cardId);
  if (!card) {
    throw { type: "NotFound", message: "Card not found" };
  }
  if (!card.isVirtual) {
    return await findByCardId(cardId);
  } else {
    return await findByCardId(card.originalCardId);
  }
}

export async function rechargeCardById(cardId: number, amount: number) {
  const card = await findById(cardId);
  if (!card) {
    throw { type: "NotFound", message: "Card not found" };
  }
  if (!card.password) {
    throw { type: "BadRequest", message: "Card must be active" };
  }
  if (card.isVirtual) {
    throw {
      type: "BadRequest",
      message: "You must recharge the original card",
    };
  }
  validateExpirationDate(card.expirationDate);
  const rechargeData = {
    cardId,
    amount,
  };
  await insert(rechargeData);
  return;
}
