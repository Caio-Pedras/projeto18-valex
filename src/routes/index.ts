import { Router } from "express";
import cardRouter from "./cardRouter.js";
import buyRouter from "./buyRouter.js";
import rechargeRouter from "./rechargeRouter.js";

const router = Router();
router.use(cardRouter)
router.use(buyRouter)
router.use(rechargeRouter)

export default router;