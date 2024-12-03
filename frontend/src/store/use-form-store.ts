import { create } from "zustand";
import type { AIFormStore } from "src/types";

const initialState: AIFormStore['values'] = {
  name: "",
  objective: "Profit", 
  activityLevel: "Moderate", 
  riskLevel: "Medium", 
  reinvestProfits: false,
  selectedTopics: [],
  hasGeneratedWallet: false,
  hasFunds: false,
  walletAddress: ""
};

export const useFormStore = create<AIFormStore>((set) => ({
  step: 1,
  values: initialState,
  actions: {
    setField: (field, value) =>
      set((state) => ({
        values: { ...state.values, [field]: value },
      })),
    nextStep: () => 
      set((state) => ({
        step: Math.min(state.step + 1, 3)
      })),
    prevStep: () => 
      set((state) => ({
        step: Math.max(state.step - 1, 1)
      })),
    reset: () => set({ step: 1, values: initialState }),
  },
}));