import { Router } from "express";
import healthRouter from "./healthRoute";
import menuRoutes from "./menuRoutes";

const router = Router();

router.use("/health", healthRouter);
router.use("/menu", menuRoutes);

export default router;
