import { create } from 'zustand';
import type { TokenizeStore } from 'src/types';

export const useTokenizeStore = create<TokenizeStore>((set) => ({
  values: {
    tweetUrl: '',
    marketName: '',
    initialSupply: 0,
    price: 0,
    isSubmitting: false,
  },
  actions: {
    setFieldValue: (field, value) => 
      set((state) => ({
        values: {
          ...state.values,
          [field]: typeof value === 'number' ? Number(value) : value,
        },
      })),
    setIsSubmitting: (isSubmitting) =>
      set((state) => ({
        values: { ...state.values, isSubmitting },
      })),
    resetForm: () =>
      set({
        values: {
          tweetUrl: '',
          marketName: '',
          initialSupply: 0,
          price: 0,
          isSubmitting: false,
        },
      }),
  },
}));