import { z } from "zod";

export const tokenizationSchema = z.object({
  tweetUrl: z
    .string()
    .min(1, "Tweet URL is required")
    .regex(
      /^https:\/\/warpcast\.com\/[^\/]+\/[^\/]+$/,
      "URL must be in format: https://warpcast.com/username/hash"
    ),
  marketName: z.string().min(1, "Market name is required"),
  initialSupply: z
    .number()
    .min(1, "Initial supply must be greater than 0")
    .max(1000000, "Initial supply too high"),
  price: z
    .number()
    .min(0.0001, "Price should be a positive value")
    .max(1000, "Price is too high"),
});