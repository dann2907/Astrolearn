export type GameState = 'BOOT' | 'PRELOAD' | 'MENU' | 'PLAYING' | 'GAMEOVER';

export interface GameScore {
  stardust: number;
  xp: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[]; // Always 4 options
  correctIndex: number; // 0-3
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuestionAnswer {
  questionId: string;
  selectedIndex: number;
  correct: boolean;
  timestamp: number; // When answered in game
}

export interface GameResult {
  score: number;
  duration: number; // seconds
  answers: QuestionAnswer[];
}

export interface GameReward {
  xp: number;
  stardust: number;
  flagged: boolean; // If validation failed
}
