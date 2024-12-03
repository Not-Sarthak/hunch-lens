import { create } from "zustand";
import type { AIFormStore } from "src/types";

const initialState: AIFormStore['values'] = {
  name: "",
  objective: "Profit", 
  activityLevel: "Moderate", 
  riskLevel: "Medium", 
  reinvestProfits: false,
  selectedTopics: [],
};

export const useFormStore = create<AIFormStore>((set) => ({
  values: initialState,
  actions: {
    setField: (field, value) =>
      set((state) => ({
        values: { ...state.values, [field]: value },
      })),
    reset: () => set({ values: initialState }),
  },
}));