import { Router } from "express";

const router = Router();

router.get("/health", (_req, res) => {
	res.json({
		status: "ok",
		timestamp: Date.now(),
		uptime: process.uptime(),
	});
});

export default router;
