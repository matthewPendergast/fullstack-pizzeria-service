import express from "express";
import { requireAuth } from "../middlewares/requireAuth";
import { placeOrder } from "../controllers/orderController";

const router = express.Router();

router.post("/", requireAuth, placeOrder);

export default router;
