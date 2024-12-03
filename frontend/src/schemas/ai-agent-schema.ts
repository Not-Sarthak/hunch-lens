import { z } from "zod";

export const aiAgentSchema = z.object({
  // Basic Info
  name: z.string().min(1, "Name is required"),
  objective: z.enum(["Profit", "Value", "Diversify"], {
    required_error: "Objective is required",
  }),
  activityLevel: z.union([
    z.enum(["Frequent", "Moderate", "Rare"]),
    z.number().min(1).max(10)
  ]),
  riskLevel: z.union([
    z.enum(["Aggressive", "Medium", "Conservative"]),
    z.number().min(1).max(10)
  ]),
  reinvestProfits: z.boolean(),
  
  // Topics
  selectedTopics: z.array(z.string()),
  
  // Wallet
  walletAddress: z.string().optional(),
  hasGeneratedWallet: z.boolean().default(false),
  hasFunds: z.boolean().default(false)
});