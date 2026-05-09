import type { Question, GameResult, GameReward } from '@/lib/game/types';

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
