import { Request, Response } from "express";
import { validatePayment } from "../services/paymentService.js";

export async function postPayment(req: Request, res: Response) {
  const { cardId, password, businessId, amount } = req.body;
  await validatePayment(cardId, password, businessId, amount);
  res.status(201).send("Successful payment");
}
