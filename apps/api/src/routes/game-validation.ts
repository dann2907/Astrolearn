export interface GameResultInput {
  score: number;
  duration: number;
  answers: Array<{
    questionId: string;
    selectedIndex: number;
    correct: boolean;
    timestamp: number;
  }>;
}

export interface ValidationResult {
  valid: boolean;
  flagged: boolean;
  reason?: string;
  xp?: number;
  stardust?: number;
}

export function validateGameResult(result: GameResultInput): ValidationResult {
  if (result.duration < 0) {
    throw new Error('Duration cannot be negative');
  }

  if (result.duration < 10) {
    return { valid: false, flagged: true, reason: 'Game duration too short' };
  }

  // 1. Score Sanity Check
  const maxPossibleScore = result.duration * 20;
  if (result.score > maxPossibleScore) {
    return { valid: true, flagged: true, reason: 'Score exceeds maximum possible' };
  }

  // 2. Answer Count Check
  const maxPossibleAnswers = Math.floor(result.duration / 30) + 1;
  if (result.answers.length > maxPossibleAnswers) {
    return { valid: true, flagged: true, reason: 'Too many answers for duration' };
  }

  // 3. Answer Timestamp Check
  for (const answer of result.answers) {
    if (answer.timestamp > result.duration * 1000 || answer.timestamp < 0) {
      return { valid: true, flagged: true, reason: 'Invalid answer timestamp' };
    }
  }

  // Calculate rewards for valid result
  const xp = Math.min(Math.round(result.score / 10), 500);
  const stardust = Math.min(Math.round(result.score / 20), 250);

  return {
    valid: true,
    flagged: false,
    xp,
    stardust,
  };
}
