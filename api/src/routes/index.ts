import { Router } from "express";
import healthRouter from "./healthRoute";

const router = Router();

router.use("/", healthRouter);

export default router;
