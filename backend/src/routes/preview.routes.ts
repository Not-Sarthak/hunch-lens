import express, { Request, Response } from "express";
import { getPreviewFromURL } from "../tools/getPreviewFromURL.js";

const router = express.Router();

router.get("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const { url } = req.query;

    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: "URL parameter is required" });
    }

    const preview = await getPreviewFromURL(url);
    res.send(preview);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch preview" });
  }
});

export default router;
