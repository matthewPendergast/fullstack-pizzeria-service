import express from "express";
import {
	getCart,
	addItemToCart,
	updateItemQuantity,
	deleteItemFromCart,
	mergeCart,
} from "../controllers/cartController";
import { requireAuth } from "../middlewares/requireAuth";

const router = express.Router();

router.use(requireAuth);

router.get("/", getCart);
router.post("/", addItemToCart);
router.put("/:itemId", updateItemQuantity);
router.delete("/:itemId", deleteItemFromCart);
router.post("/merge", mergeCart);

export default router;
