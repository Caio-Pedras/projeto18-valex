import { Router } from "express";
import {
  activateCard,
  blockCard,
  createCard,
  createVirtualCard,
  getTransactions,
  unblockCard,
} from "../controllers/cardController.js";
import { APIKeyValidator } from "../middlewares/validateAPIKey.js";
import { schemaValidator } from "../middlewares/validateSchema.js";
import activateSchema from "../schemas/activateSchema.js";
import createSchema from "../schemas/createSchema.js";
import passwordSchema from "../schemas/passwordSchema.js";

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
cardRouter.post("/card/block/:id", schemaValidator(passwordSchema), blockCard);
cardRouter.post(
  "/card/unblock/:id",
  schemaValidator(passwordSchema),
  unblockCard
);

cardRouter.post(
  "/cards/virtual/:id",
  schemaValidator(passwordSchema),
  createVirtualCard
);

export default cardRouter;
