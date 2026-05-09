import { create } from 'zustand';

export type LandingTab = 'beranda' | 'materi' | 'game' | 'kuis' | 'proses&badge';

interface LandingStore {
  activeTab: LandingTab;
  setActiveTab: (tab: LandingTab) => void;
}

export const useLandingStore = create<LandingStore>((set) => ({
  activeTab: 'beranda',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
