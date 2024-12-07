import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { retrieveCastFromURL } from "../farcaster/retrieveCastFromURL.js";
import { retrieveTweetFromURL } from "../twitter/getTweetDetails.js";
import { ethers } from "ethers";

const prisma = new PrismaClient();
const router = express.Router();

router.post(
  "/create-market",
  async (req: Request, res: Response): Promise<any> => {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    try {
      let type: "Farcaster" | "Twitter";
      let data: string;

      if (url.includes("warpcast.com")) {
        type = "Farcaster";
        data = await retrieveCastFromURL(url);
      } else if (url.includes("x.com")) {
        type = "Twitter";
        data = await retrieveTweetFromURL(url);
      } else {
        return res.status(400).json({ error: "Invalid URL format" });
      }

      const publicAddress = ethers.Wallet.createRandom().address;

      const tokenizedAsset = await prisma.tokenizedAsset.create({
        data: {
          type,
          url,
          data,
          publicAddress,
        },
      });

      res.status(201).json({
        message: "Tokenized asset created successfully",
        asset: tokenizedAsset,
      });
    } catch (error) {
      console.error("Error creating market:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

/**
 * GET /api/tokenization/markets
 * Retrieve all tokenized markets
 */
router.get("/markets", async (req: Request, res: Response) => {
  try {
    const markets = await prisma.tokenizedAsset.findMany({
      orderBy: { createdAt: "desc" },
    });
    console.log(markets)
    res.status(200).json({ success: true, markets });
  } catch (error) {
    console.error("Error fetching markets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET /api/tokenization/markets/:id
 * Retrieve a single market by ID
 */
router.get(
  "/markets/:id",
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      return res.status(400).json({ error: "Invalid market ID format" });
    }

    try {
      const market = await prisma.tokenizedAsset.findUnique({
        where: { id: parseInt(id, 10) },
      });

      if (!market) {
        return res.status(404).json({ error: "Market not found" });
      }

      res.status(200).json({ success: true, market });
    } catch (error) {
      console.error("Error fetching market:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
