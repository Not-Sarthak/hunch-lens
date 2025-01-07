import { z } from "zod";
import { tokenizationSchema } from "src/schemas/tokenize-cast-schema";

export type FormStep = 1 | 2 | 3;
export type GoalType = "profit" | "values" | "social";
export type StrategyType =
  | "Scout" 
  | "Maker" 
  | "Bull" 
  | "Bear"; 
export type AIType = "eliza" | "custom";
export type AIGoalType = "aggressive" | "conservative" | "moderate";

export interface FormState {
  step: FormStep;
  name: string;
  lensname: string;
  goal: GoalType;
  aiType: AIType;
  aiGoal?: AIGoalType;
  riskTolerance: number;
  selectedStrategies: StrategyType[];
  compoundProfits: boolean;
  walletId: string;
}

export interface FormStore extends FormState {
  setStep: (step: FormStep) => void;
  setField: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  reset: () => void;
}

export type TokenizeFormData = z.infer<typeof tokenizationSchema>;

export interface TokenizeStore {
  values: {
    tweetUrl: string;
    marketName: string;
    initialSupply: number;
    price: number;
    isSubmitting: boolean;
  };
  actions: {
    setFieldValue: (field: string, value: string | number) => void;
    setIsSubmitting: (isSubmitting: boolean) => void;
    resetForm: () => void;
  };
}
