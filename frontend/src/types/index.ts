import { z } from "zod";
import { tokenizationSchema } from "src/schemas/tokenize-cast-schema";
import { aiAgentSchema } from "src/schemas/ai-agent-schema";

export type TokenizeFormData = z.infer<typeof tokenizationSchema>;
export type AIAgentFormData = z.infer<typeof aiAgentSchema>;

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

export interface AIFormStore {
  step: number; 
  values: AIAgentFormData & { selectedTopics: string[] };
  actions: {
    setField: <K extends keyof (AIAgentFormData & { selectedTopics: string[] })>(
      field: K,
      value: (AIAgentFormData & { selectedTopics: string[] })[K]
    ) => void;
    nextStep: () => void;  
    prevStep: () => void;  
    reset: () => void;
  };
}