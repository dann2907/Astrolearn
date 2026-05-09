import { apiFetch, apiClient } from '@/lib/api-client';
import type { Question, GameResult, GameReward } from '@/lib/game/types';
import { 
  mockFetchRandomQuestion, 
  mockSubmitGameResult 
} from './mock-game';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

export async function fetchRandomQuestion(topics: string[]): Promise<Question> {
  if (USE_MOCK) {
    return mockFetchRandomQuestion();
  }

  const params = new URLSearchParams();
  params.append('count', '1');
  topics.forEach(t => params.append('topics', t));

  const data = await apiFetch(`/questions/random?${params.toString()}`);
  return data.questions[0]; // API returns array, we take first
}

export async function submitGameResult(result: GameResult): Promise<GameReward> {
  if (USE_MOCK) {
    return mockSubmitGameResult(result);
  }

  return apiClient.post('/games/shooter/result', result);
}
