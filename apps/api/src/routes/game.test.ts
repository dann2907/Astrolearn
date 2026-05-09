// This test file requires vitest. If not installed, run: pnpm add -D vitest
import { describe, it, expect } from 'vitest';
import { validateGameResult } from './game-validation';

describe('Game Result Validation', () => {
  it('should accept valid game result', () => {
    const result = {
      score: 500,
      duration: 60,
      answers: [
        { questionId: 'q1', selectedIndex: 1, correct: true, timestamp: 15000 },
        { questionId: 'q2', selectedIndex: 2, correct: false, timestamp: 45000 },
      ],
    };

    const validation = validateGameResult(result);
    expect(validation.valid).toBe(true);
    expect(validation.flagged).toBe(false);
    expect(validation.xp).toBe(50);
    expect(validation.stardust).toBe(25);
  });

  it('should flag impossibly high score', () => {
    const result = {
      score: 10000, // Too high for 60 seconds (max is 60 * 20 = 1200)
      duration: 60,
      answers: [],
    };

    const validation = validateGameResult(result);
    expect(validation.flagged).toBe(true);
    expect(validation.reason).toContain('Score exceeds maximum');
  });

  it('should flag too many answers', () => {
    const result = {
      score: 500,
      duration: 60, // Only floor(60/30) + 1 = 3 questions possible
      answers: Array(10).fill({
        questionId: 'q1',
        selectedIndex: 0,
        correct: true,
        timestamp: 30000,
      }),
    };

    const validation = validateGameResult(result);
    expect(validation.flagged).toBe(true);
    expect(validation.reason).toContain('Too many answers');
  });

  it('should reject negative duration', () => {
    const result = {
      score: 100,
      duration: -5,
      answers: [],
    };

    expect(() => validateGameResult(result)).toThrow('Duration cannot be negative');
  });
});
