import { Router } from "express";
import healthRouter from "./healthRoute";
import menuRoutes from "./menuRoutes";
import authRoutes from "./authRoutes";

const router = Router();

router.use("/health", healthRouter);
router.use("/menu", menuRoutes);
router.use("/auth", authRoutes);

export default router;
