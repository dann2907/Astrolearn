# Mini-Sprint 1.2b: Game-Question Integration

Goal: Soal astronomi muncul dalam game + skor divalidasi server
Blocker: Sprint 1.2a must be complete
Dependencies from Sprint 1.2a

GameScene.ts exists and functional
Phaser mount/unmount stable
Mobile touch works

Dependencies from Team 1 (Backend)

API endpoint ready (or use mock):

GET /api/questions/random?count=1&topics=bintang
POST /api/games/shooter/result

Tasks (Atomic & Sequenced)
Phase 0: API Contract & Mock Setup
Task 0.1: Define TypeScript Types for API
File: apps/web/src/lib/game/types.ts
typescriptexport interface Question {
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
Acceptance Criteria:

- [x] Types exported correctly
- [x] No TypeScript errors
- [ ] Matches API contract from docs/API_CONTRACT.md

Task 0.2: Create API Client Utility
File: apps/web/src/lib/api/game.ts
typescriptimport type { Question, GameResult, GameReward } from '@/lib/game/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function fetchRandomQuestion(topics: string[]): Promise<Question> {
  const params = new URLSearchParams();
  params.append('count', '1');
  topics.forEach(t => params.append('topics', t));

  const response = await fetch(`${API_BASE}/api/questions/random?${params}`, {
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`, // TODO: implement auth
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch question: ${response.statusText}`);
  }

  const data = await response.json();
  return data.questions[0]; // API returns array, we take first
}

export async function submitGameResult(result: GameResult): Promise<GameReward> {
  const response = await fetch(`${API_BASE}/api/games/shooter/result`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(result),
  });

  if (!response.ok) {
    throw new Error(`Failed to submit result: ${response.statusText}`);
  }

  return response.json();
}

function getAuthToken(): string {
  // TODO: Get from auth context/cookie
  return 'mock-token-for-development';
}
Acceptance Criteria:

- [ ] Functions typed correctly
- [ ] Error handling present
- [ ] Auth token placeholder ready

Task 0.3: Create Mock API for Development
File: apps/web/src/lib/api/mock-game.ts
typescriptimport type { Question, GameResult, GameReward } from '@/lib/game/types';

const MOCK_QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: 'Berapa suhu permukaan Matahari?',
    options: ['3.000°C', '5.500°C', '10.000°C', '15.000°C'],
    correctIndex: 1,
    topic: 'tata-surya',
    difficulty: 'easy',
  },
  {
    id: 'q2',
    text: 'Planet terbesar di tata surya adalah?',
    options: ['Mars', 'Saturnus', 'Jupiter', 'Neptunus'],
    correctIndex: 2,
    topic: 'tata-surya',
    difficulty: 'easy',
  },
  {
    id: 'q3',
    text: 'Apa yang dimaksud dengan tahun cahaya?',
    options: [
      'Waktu cahaya mengelilingi bumi',
      'Jarak yang ditempuh cahaya dalam 1 tahun',
      'Kecepatan cahaya dalam 1 tahun',
      'Umur bintang',
    ],
    correctIndex: 1,
    topic: 'bintang',
    difficulty: 'medium',
  },
];

export async function mockFetchRandomQuestion(): Promise<Question> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const randomIndex = Math.floor(Math.random() * MOCK_QUESTIONS.length);
  return MOCK_QUESTIONS[randomIndex];
}

export async function mockSubmitGameResult(result: GameResult): Promise<GameReward> {
  await new Promise(resolve => setTimeout(resolve, 300));

  // Simple validation (mimic server-side)
  const maxPossibleScore = result.duration * 10; // Assume 10 points/sec max
  const flagged = result.score > maxPossibleScore;

  // Calculate rewards
  const xp = Math.min(Math.round(result.score / 10), 500);
  const stardust = Math.min(Math.round(result.score / 20), 250);

  return {
    xp: flagged ? 0 : xp,
    stardust: flagged ? 0 : stardust,
    flagged,
  };
}
Acceptance Criteria:

- [ ] 3+ mock questions available
- [ ] Mock functions simulate async behavior
- [ ] Validation logic matches server contract

Task 0.4: Environment Toggle for Mock vs Real API
File: apps/web/src/lib/api/game.ts (update)
typescriptimport { 
  mockFetchRandomQuestion, 
  mockSubmitGameResult 
} from './mock-game';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

export async function fetchRandomQuestion(topics: string[]): Promise<Question> {
  if (USE_MOCK) {
    return mockFetchRandomQuestion();
  }
  
  // Real API logic...
}

export async function submitGameResult(result: GameResult): Promise<GameReward> {
  if (USE_MOCK) {
    return mockSubmitGameResult(result);
  }
  
  // Real API logic...
}
File: apps/web/.env.local
bashNEXT_PUBLIC_USE_MOCK_API=true
NEXT_PUBLIC_API_URL=http://localhost:3001
Acceptance Criteria:

- [ ] Mock API works when env var set to true
- [ ] Real API attempted when env var set to false
- [ ] No errors when switching modes
