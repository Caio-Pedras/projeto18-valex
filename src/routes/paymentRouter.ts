import { Router } from "express";
import { postPayment } from "../controllers/paymentController.js";
import { schemaValidator } from "../middlewares/validateSchema.js";
import paymentSchema from "../schemas/paymentSchema.js";

const paymentRouter = Router();

paymentRouter.post("/payment", schemaValidator(paymentSchema), postPayment);
export default paymentRouter;
