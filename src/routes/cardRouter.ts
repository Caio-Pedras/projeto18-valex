import { Router } from "express";
import {
  activateCard,
  createCard,
  getTransactions,
} from "../controllers/cardController.js";
import { APIKeyValidator } from "../middlewares/validateAPIKey.js";
import { schemaValidator } from "../middlewares/validateSchema.js";
import activateSchema from "../schemas/activateSchema.js";
import createSchema from "../schemas/createSchema.js";

const cardRouter = Router();

cardRouter.post(
  "/cards",
  APIKeyValidator,
  schemaValidator(createSchema),
  createCard
);
cardRouter.put(
  "/cards/activate/:id",
  schemaValidator(activateSchema),
  activateCard
);
cardRouter.get("/cards/transactions/:id", getTransactions);
cardRouter.post("/card/block/:id");
cardRouter.post("/card/unblock/:id");

export default cardRouter;
