import { Request, Response } from "express";
import * as cardService from "../services/cardService.js";
import {
  handleCardBalance,
  listTransactions,
} from "../services/paymentService.js";
import { getRecharges } from "../services/rechargeService.js";

export async function createCard(req: Request, res: Response) {
  const APIKey: string = req.headers["x-api-key"].toString();
  const { employeeId, type } = req.body;
  await cardService.createCard(APIKey, employeeId, type);

  res.sendStatus(201);
}

export async function activateCard(req: Request, res: Response) {
  const { id: cardId } = req.params;
  const { cvc, password } = req.body;
  await cardService.activateCard(Number(cardId), cvc, password);

  res.sendStatus(201);
}

export async function getTransactions(req: Request, res: Response) {
  const { id: cardId } = req.params;
  const transactions = await listTransactions(Number(cardId));
  const recharges = await getRecharges(Number(cardId));
  const balance = handleCardBalance(transactions, recharges);
  res.status(200).send({ balance, transactions, recharges });
}
