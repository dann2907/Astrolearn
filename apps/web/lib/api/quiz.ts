import { apiFetch, apiClient } from '@/lib/api-client';
import type { QuizQuestion, QuizResult, LeaderboardEntry } from '@/lib/quiz/types';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

export async function fetchQuizQuestions(count: number = 10): Promise<QuizQuestion[]> {
  if (USE_MOCK) {
    return mockFetchQuizQuestions(count);
  }

  const data = await apiFetch(`/questions/random?count=${count}`);
  return data.questions;
}

export async function submitQuizResult(result: QuizResult): Promise<{ xp: number }> {
  if (USE_MOCK) {
    return mockSubmitQuizResult(result);
  }

  return apiClient.post('/quiz-results', result);
}

export async function fetchLeaderboard(
  scope: 'global' | 'weekly' = 'global'
): Promise<LeaderboardEntry[]> {
  if (USE_MOCK) {
    return mockFetchLeaderboard(scope);
  }

  const data = await apiFetch(`/leaderboard?scope=${scope}`);
  return data.entries;
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
    {
      id: 'q3',
      text: 'Berapa jarak rata-rata Bumi ke Matahari?',
      options: ['150 juta km', '200 juta km', '100 juta km', '250 juta km'],
      correctIndex: 0,
    },
    {
      id: 'q4',
      text: 'Planet yang memiliki cincin paling megah?',
      options: ['Jupiter', 'Uranus', 'Neptunus', 'Saturnus'],
      correctIndex: 3,
    },
    {
      id: 'q5',
      text: 'Berapa jumlah planet di tata surya?',
      options: ['7', '8', '9', '10'],
      correctIndex: 1,
    },
    {
      id: 'q6',
      text: 'Galaksi tempat kita tinggal bernama?',
      options: ['Andromeda', 'Bima Sakti', 'Sombrero', 'Triangulum'],
      correctIndex: 1,
    },
    {
      id: 'q7',
      text: 'Planet yang dijuluki Planet Merah?',
      options: ['Merkurius', 'Venus', 'Mars', 'Jupiter'],
      correctIndex: 2,
    },
    {
      id: 'q8',
      text: 'Bulan terbesar di Jupiter?',
      options: ['Europa', 'Ganymede', 'Callisto', 'Io'],
      correctIndex: 1,
    },
    {
      id: 'q9',
      text: 'Lapisan terluar Matahari yang terlihat saat gerhana?',
      options: ['Fotosfer', 'Kromosfer', 'Korona', 'Inti'],
      correctIndex: 2,
    },
    {
      id: 'q10',
      text: 'Berapa waktu tempuh cahaya dari Matahari ke Bumi?',
      options: ['8 detik', '8 menit', '1 jam', '1 hari'],
      correctIndex: 1,
    },
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
    { rank: 4, userId: 'u4', username: 'MoonWalker', score: 1900, completedAt: '2026-05-08T11:00:00Z' },
    { rank: 5, userId: 'u5', username: 'NebulaNomad', score: 1800, completedAt: '2026-05-08T08:20:00Z' },
  ];
}
