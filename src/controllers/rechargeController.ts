import { Request, Response } from "express";
import { rechargeCardById } from "../services/rechargeService";

export async function rechargeCard(req: Request, res: Response) {
  const { id: cardId } = req.params;
  const { amount } = req.body;
  await rechargeCardById(Number(cardId), amount);

  res.status(201).send(`Amount:${amount} successfully recharged`);
}
