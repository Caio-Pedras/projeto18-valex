import { Router } from "express";
import { rechargeCard } from "../controllers/rechargeController.js";
import { APIKeyValidator } from "../middlewares/validateAPIKey.js";
import { schemaValidator } from "../middlewares/validateSchema.js";
import rechargeSchema from "../schemas/rechargeSchema.js";
var rechargeRouter = Router();
rechargeRouter.post("/recharge/:id", APIKeyValidator, schemaValidator(rechargeSchema), rechargeCard);
export default rechargeRouter;
