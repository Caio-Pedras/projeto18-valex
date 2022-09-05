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
  const cardData = await cardService.createCard(APIKey, employeeId, type);

  res.status(201).send(cardData);
}

export async function activateCard(req: Request, res: Response) {
  const { id: cardId } = req.params;
  const { cvc, password } = req.body;
  await cardService.activateCard(Number(cardId), cvc, password);

  res.status(201).send("Card activated successfully");
}

export async function getTransactions(req: Request, res: Response) {
  const { id: cardId } = req.params;
  const transactions = await listTransactions(Number(cardId));
  const recharges = await getRecharges(Number(cardId));
  const balance = await handleCardBalance(transactions, recharges);
  res.status(200).send({ balance, transactions, recharges });
}

export async function blockCard(req: Request, res: Response) {
  const { id: cardId } = req.params;
  const { password } = req.body;

  await cardService.toogleBlockCard(Number(cardId), password, "block");

  res.status(200).send("Card blocked successfully");
}

export async function unblockCard(req: Request, res: Response) {
  const { id: cardId } = req.params;
  const { password } = req.body;

  await cardService.toogleBlockCard(Number(cardId), password, "unblock");

  res.status(200).send("Card unblocked successfully");
}

export async function createVirtualCard(req: Request, res: Response) {
  const { id: cardId } = req.params;
  const { password } = req.body;
  const cardData = await cardService.createVirtualCard(
    Number(cardId),
    password
  );
  res.status(201).send(cardData);
}
