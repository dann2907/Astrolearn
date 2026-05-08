import { create } from "zustand";

interface UiStore {
  currentView: string;
  isLoading: boolean;
  showAiRec: boolean;
  setCurrentView: (view: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  dismissAiRecommendation: () => void;
}

export const useUiStore = create<UiStore>((set) => ({
  currentView: "dashboard",
  isLoading: true,
  showAiRec: true,
  setCurrentView: (view) => set({ currentView: view }),
  setIsLoading: (isLoading) => set({ isLoading }),
  dismissAiRecommendation: () => set({ showAiRec: false }),
}));
