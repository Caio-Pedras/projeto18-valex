import { Request, Response } from "express";
import {
  validateOnlinePayment,
  validatePayment,
} from "../services/paymentService.js";

export async function postPayment(req: Request, res: Response) {
  const { cardId, password, businessId, amount } = req.body;
  await validatePayment(cardId, password, businessId, amount);
  res.status(201).send("Successful payment");
}
export async function postOnlinePayment(req: Request, res: Response) {
  const { number, cardHolderName, expirationDate, cvc, businessId, amount } =
    req.body;
  await validateOnlinePayment(
    number,
    cardHolderName,
    expirationDate,
    cvc,
    businessId,
    amount
  );
  res.status(201).send("Successful payment");
}
