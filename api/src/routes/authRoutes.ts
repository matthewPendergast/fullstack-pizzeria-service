import { Router } from "express";
import { signup, login, getCurrentUser } from "../controllers/authController";
import { requireAuth } from "../middlewares/requireAuth";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", requireAuth, (req, res) => {
	res.clearCookie("token").json({ message: "Logged out" });
});
router.get("/me", requireAuth, getCurrentUser);

export default router;
