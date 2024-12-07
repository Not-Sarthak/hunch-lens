import express from 'express';
import agentRoutes from './agent.routes.js';
import tokenizationRoutes from './tokenization.routes.js';

const router = express.Router();

router.use('/agents', agentRoutes);
router.use('/tokenization', tokenizationRoutes);

export default router;
