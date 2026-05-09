# Mini-Sprint 1.2c: Arena & Leaderboard

Goal: Arena Kuis Cepat berfungsi + Leaderboard read-only
Blocker: None (can run parallel to 1.2b if desired)
Dependencies

Database table leaderboard_entries ready
API endpoints (or mock):

GET /api/questions/random
POST /api/quiz-results
GET /api/leaderboard?scope=global|weekly

Tasks (Atomic & Sequenced)
Phase 0: API Setup
Task 0.1: Define Quiz Types
File: apps/web/src/lib/quiz/types.ts
typescriptexport interface QuizQuestion {
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
Acceptance Criteria:

- [x] Types match API contract
- [x] No TypeScript errors

Task 0.2: Create Quiz API Client
File: apps/web/src/lib/api/quiz.ts
typescriptimport type { QuizQuestion, QuizResult, LeaderboardEntry } from '@/lib/quiz/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

export async function fetchQuizQuestions(count: number = 10): Promise<QuizQuestion[]> {
  if (USE_MOCK) {
    return mockFetchQuizQuestions(count);
  }

  const response = await fetch(
    `${API_BASE}/api/questions/random?count=${count}`,
    {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (!response.ok) throw new Error('Failed to fetch questions');

  const data = await response.json();
  return data.questions;
}

export async function submitQuizResult(result: QuizResult): Promise<{ xp: number }> {
  if (USE_MOCK) {
    return mockSubmitQuizResult(result);
  }

  const response = await fetch(`${API_BASE}/api/quiz-results`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(result),
  });

  if (!response.ok) throw new Error('Failed to submit result');

  return response.json();
}

export async function fetchLeaderboard(
  scope: 'global' | 'weekly' = 'global'
): Promise<LeaderboardEntry[]> {
  if (USE_MOCK) {
    return mockFetchLeaderboard(scope);
  }

  const response = await fetch(`${API_BASE}/api/leaderboard?scope=${scope}`);

  if (!response.ok) throw new Error('Failed to fetch leaderboard');

  const data = await response.json();
  return data.entries;
}

function getAuthToken(): string {
  // TODO: Implement actual auth
  return 'mock-token';
}

// Mock implementations
async function mockFetchQuizQuestions(count: number): Promise<QuizQuestion[]> {
  await new Promise(r => setTimeout(r, 300));
  
  const pool: QuizQuestion[] = [
    {
      id: 'q1',
      text: 'Berapa suhu inti Matahari?',
      options: ['5 juta K', '10 juta K', '15 juta K', '20 juta K'],
      correctIndex: 2,
    },
    {
      id: 'q2',
      text: 'Planet terbesar di tata surya?',
      options: ['Mars', 'Saturnus', 'Jupiter', 'Neptunus'],
      correctIndex: 2,
    },
    // Add 8 more mock questions...
  ];

  return pool.slice(0, count);
}

async function mockSubmitQuizResult(result: QuizResult): Promise<{ xp: number }> {
  await new Promise(r => setTimeout(r, 200));
  
  const xp = result.correctCount * 50 + result.comboMax * 10;
  return { xp };
}

async function mockFetchLeaderboard(scope: string): Promise<LeaderboardEntry[]> {
  await new Promise(r => setTimeout(r, 400));
  
  return [
    { rank: 1, userId: 'u1', username: 'AstroKing', score: 2500, completedAt: '2026-05-08T10:30:00Z' },
    { rank: 2, userId: 'u2', username: 'StarGazer', score: 2300, completedAt: '2026-05-08T09:15:00Z' },
    { rank: 3, userId: 'u3', username: 'CosmicExplorer', score: 2100, completedAt: '2026-05-07T18:45:00Z' },
    // Add more mock entries...
  ];
}
Acceptance Criteria:

- [x] Functions implement full interface
- [x] Mock data realistic
- [x] Auth token placeholder ready
