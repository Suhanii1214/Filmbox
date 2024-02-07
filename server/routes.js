import { Router } from "express";
import { checkout, paymentVerfication } from "./controller.js";

export const router = Router()

router.post("/checkout", checkout)
router.post("/paymentverification", paymentVerfication)