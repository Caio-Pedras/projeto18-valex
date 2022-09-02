import {
  findByCardId,
  PaymentWithBusinessName,
} from "../repositories/paymentRepository.js";
import { Recharge } from "../repositories/rechargeRepository.js";

export async function listTransactions(cardId: number) {
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
