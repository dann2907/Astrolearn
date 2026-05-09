export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
}

export interface QuizAnswer {
  questionId: string;
  selectedIndex: number;
  correct: boolean;
  timeSpent: number; // ms
}

export interface QuizResult {
  score: number;
  correctCount: number;
  wrongCount: number;
  comboMax: number;
  answers: QuizAnswer[];
  duration: number; // ms
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  score: number;
  completedAt: string;
}
