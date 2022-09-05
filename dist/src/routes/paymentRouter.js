import { Router } from "express";
import { postPayment } from "../controllers/paymentController.js";
import { schemaValidator } from "../middlewares/validateSchema.js";
import onlinePaymentSchema from "../schemas/onlinePaymentSchema.js";
import paymentSchema from "../schemas/paymentSchema.js";
var paymentRouter = Router();
paymentRouter.post("/payment", schemaValidator(paymentSchema), postPayment);
paymentRouter.post("/payment/online", schemaValidator(onlinePaymentSchema));
export default paymentRouter;
