import type { LucideIcon } from "lucide-react";

export interface Quest {
  id: string;
  task: string;
  reward: string;
  progress: string;
  done: boolean;
}

export interface LearningNode {
  id: string;
  label: string;
  status: "completed" | "active" | "locked";
  progress: number;
  icon: LucideIcon;
}

export interface MainQuest {
  chapter: string;
  module: string;
  progress: number;
}
