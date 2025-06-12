import { Router } from "express";
import { signup, login, getCurrentUser } from "../controllers/authController";
import { requireAuth } from "../middlewares/requireAuth";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", requireAuth, getCurrentUser);

export default router;
