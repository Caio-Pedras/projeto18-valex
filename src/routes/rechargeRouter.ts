import { Router } from "express";
import { rechargeCard } from "../controllers/rechargeController";
import { APIKeyValidator } from "../middlewares/validateAPIKey";
import { schemaValidator } from "../middlewares/validateSchema";
import rechargeSchema from "../schemas/rechargeSchema";

const rechargeRouter = Router();

rechargeRouter.post(
  "/recharge/:id",
  APIKeyValidator,
  schemaValidator(rechargeSchema),
  rechargeCard
);

export default rechargeRouter;
