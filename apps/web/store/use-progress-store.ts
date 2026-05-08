import { create } from "zustand";

import { learningNodes, mainQuest } from "@/lib/constants/quests";
import type { LearningNode, MainQuest } from "@/types/quest";

interface ProgressStore {
  mainQuest: MainQuest;
  learningNodes: LearningNode[];
}

export const useProgressStore = create<ProgressStore>(() => ({
  mainQuest,
  learningNodes,
}));
