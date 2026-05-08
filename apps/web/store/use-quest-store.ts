import { create } from "zustand";

import { dailyQuests } from "@/lib/constants/quests";
import type { Quest } from "@/types/quest";

interface QuestStore {
  quests: Quest[];
  toggleQuest: (questId: string) => void;
}

export const useQuestStore = create<QuestStore>((set) => ({
  quests: dailyQuests,
  toggleQuest: (questId) =>
    set((state) => ({
      quests: state.quests.map((quest) =>
        quest.id === questId ? { ...quest, done: !quest.done } : quest,
      ),
    })),
}));
