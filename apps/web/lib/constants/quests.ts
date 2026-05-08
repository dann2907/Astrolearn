import { CheckCircle2, Lock, Play } from "lucide-react";

import type { LearningNode, MainQuest, Quest } from "@/types/quest";

export const dailyQuests: Quest[] = [
  {
    id: "1",
    task: "Baca 2 sub-bab tentang Lubang Hitam",
    reward: "50 XP",
    progress: "1/2",
    done: false,
  },
  {
    id: "2",
    task: "Mainkan Eskadron Penjelajah 3 kali",
    reward: "100 Stardust",
    progress: "3/3",
    done: true,
  },
  {
    id: "3",
    task: "Jawab 10 soal di Arena Kuis",
    reward: "30 XP",
    progress: "0/10",
    done: false,
  },
];

export const mainQuest: MainQuest = {
  chapter: "Bab 2: Evolusi Bintang",
  module: "Modul: Pembentukan Protobintang",
  progress: 45,
};

export const learningNodes: LearningNode[] = [
  {
    id: "1",
    label: "Tata Surya",
    status: "completed",
    progress: 100,
    icon: CheckCircle2,
  },
  {
    id: "2",
    label: "Bintang",
    status: "active",
    progress: 45,
    icon: Play,
  },
  {
    id: "3",
    label: "Galaksi",
    status: "locked",
    progress: 0,
    icon: Lock,
  },
];
