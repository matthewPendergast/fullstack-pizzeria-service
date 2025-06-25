import { Router } from "express";
import healthRoutes from "./healthRoutes";
import menuRoutes from "./menuRoutes";
import authRoutes from "./authRoutes";
import cartRoutes from "./cartRoutes";
import orderRoutes from "./orderRoutes";
import docsRoutes from "./docsRoutes";

const router = Router();

router.use("/health", healthRoutes);
router.use("/menu", menuRoutes);
router.use("/auth", authRoutes);
router.use("/cart", cartRoutes);
router.use("/order", orderRoutes);
router.use("/docs", docsRoutes);

export default router;
