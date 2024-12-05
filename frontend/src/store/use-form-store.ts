import { create } from 'zustand';
import { FormState, FormStore } from '../types';

const initialState: FormState = {
  step: 1,
  name: '',
  basename: '',
  goal: 'profit',
  aiType: 'default',
  riskTolerance: 3,
  selectedStrategies: [],
  compoundProfits: false,
  walletId: ''
};

export const useFormStore = create<FormStore>((set) => ({
  ...initialState,
  setStep: (step) => set({ step }),
  setField: (key, value) => set({ [key]: value }),
  reset: () => set(initialState)
}));