import express, { Request, Response, NextFunction } from "express";
import { createAndFundWalletTool } from "../tools/coinbase-tools/createAndFundWalletTool.js";

const router = express.Router();

const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// POST /create-and-fund-wallet
router.post(
  "/create-and-fund-wallet",
  asyncHandler(async (req: any, res: any) => {
    try {
      const { network } = req.body;
      console.log("I am here with network:", network);
  
      const result = await createAndFundWalletTool.handler({
        network: network || "Base Sepolia",
      });
  
      res.status(201).json({
        message: "Wallet created and funded successfully",
        data: result,
      });
    } catch (error) {
      console.error("Handler error:", error);
      res.status(500).json({ error: "Failed to create and fund wallet." });
    }
  })
);

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error occurred:", err.message || err);

  res.status(500).json({
    error: "Internal Server Error",
    message: err.message || "Something went wrong",
  });
});

export default router;
