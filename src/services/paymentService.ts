import { findById } from "../repositories/cardRepository.js";
import {
  findByCardId,
  insert,
  PaymentWithBusinessName,
} from "../repositories/paymentRepository.js";
import { Recharge } from "../repositories/rechargeRepository.js";
import {
  checkPasswordIsCorrect,
  validateExpirationDate,
} from "./cardService.js";
import * as businessRepository from "../repositories/businessRepository.js";
import { getRecharges } from "./rechargeService.js";

export async function listTransactions(cardId: number) {
  const card = await findById(cardId);
  if (!card) {
    throw { type: "NotFound", message: "Card not found" };
  }
  return await findByCardId(cardId);
}
export async function handleCardBalance(
  payments: PaymentWithBusinessName[],
  recharges: Recharge[]
) {
  const totalPaymentArray = payments.map((payment) => {
    return payment.amount;
  });
  const totalRechargeArray = recharges.map((recharge) => {
    return recharge.amount;
  });
  const totalPayment = sumArray(totalPaymentArray);
  const totalRecharge = sumArray(totalRechargeArray);
  return totalRecharge - totalPayment;
}
function sumArray(array: number[]) {
  return array.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );
}

export async function validatePayment(
  cardId: number,
  password: string,
  businessId: number,
  amount: number
) {
  const card = await findById(cardId);
  if (!card) {
    throw { type: "NotFound", message: "Card not found" };
  }
  if (!card.password) {
    throw { type: "BadRequest", message: "Card must be active" };
  }
  validateExpirationDate(card.expirationDate);
  if (card.isBlocked) {
    throw { type: "BadRequest", message: "Card blocked" };
  }
  checkPasswordIsCorrect(card.password, password);
  const business = await businessRepository.findById(businessId);
  if (!business) {
    throw { type: "NotFound", message: "Business not found" };
  }
  if (card.type !== business.type) {
    throw {
      type: "BadRequest",
      message: "Card type and business type must be the same",
    };
  }
  const transactions = await listTransactions(cardId);
  const recharges = await getRecharges(cardId);
  const balance = await handleCardBalance(transactions, recharges);
  if (amount > balance) {
    throw { type: "BadRequest", message: "Not enough balance" };
  }
  const paymentData = {
    cardId,
    businessId,
    amount,
  };
  await insert(paymentData);
  return;
}
