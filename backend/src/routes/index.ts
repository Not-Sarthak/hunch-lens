import express from "express";
import agentRoutes from "./agent.routes.js";
import tokenizationRoutes from "./tokenization.routes.js";
import previewRoutes from "./preview.routes.js";
import generateRoutes from "./wallet.routes.js"

const router = express.Router();

router.use("/agents", agentRoutes);
router.use("/tokenization", tokenizationRoutes);
router.use("/preview", previewRoutes);
router.use("/generate", generateRoutes);

export default router;
