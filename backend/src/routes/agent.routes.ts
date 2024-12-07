import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// POST /create - Create an Agent
router.post(
  '/create',
  asyncHandler(async (req: Request, res: Response) => {
    const {
      userWallet,
      agentName,
      basename,
      type,
      subType,
      goalType,
      riskLevel,
      strategies,
      compoundedProfits,
      wallet,
    } = req.body;

    if (
      !userWallet ||
      !agentName ||
      !basename ||
      !type ||
      !goalType ||
      !riskLevel ||
      !strategies ||
      !wallet
    ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { walletId, address, networkId, transactionHash, amount } = wallet;

    let user = await prisma.user.findUnique({
      where: { wallet: userWallet },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { wallet: userWallet },
      });
    }

    let walletRecord = await prisma.wallet.findUnique({
      where: { walletId },
    });

    if (!walletRecord) {
      walletRecord = await prisma.wallet.create({
        data: {
          walletId,
          address,
          networkId,
          transactionHash,
          amount,
        },
      });
    }

    const agent = await prisma.agent.create({
      data: {
        name: agentName,
        basename,
        type,
        subType: type === 'Custom' ? subType : null,
        goalType,
        riskLevel,
        strategies,
        compoundedProfits,
        walletId: walletRecord.id,
        userId: user.id,
      },
    });

    res.status(201).json({
      message: 'Agent successfully created',
      agent,
    });
  })
);

// GET /:id - Get Agent by ID
router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(parseInt(id, 10))) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const agent = await prisma.agent.findUnique({
      where: { id: parseInt(id, 10) },
      include: { wallet: true, user: true },
    });

    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    res.json(agent);
  })
);

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error occurred:', err.message || err);

  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'Something went wrong',
  });
});

export default router;