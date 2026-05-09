'use client';

import { useState } from 'react';
import { QuizGame } from '@/components/quiz/QuizGame';
import { QuizResults } from '@/components/quiz/QuizResults';
import type { QuizResult } from '@/lib/quiz/types';

export default function ArenaPage() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'results'>('menu');
  const [result, setResult] = useState<QuizResult | null>(null);

  const handleStart = () => {
    setGameState('playing');
    setResult(null);
  };

  const handleComplete = (finalResult: QuizResult) => {
    setResult(finalResult);
    setGameState('results');
  };

  const handleRetry = () => {
    setGameState('playing');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {gameState === 'menu' && (
          <div className="text-center py-20">
            <h1 className="text-6xl font-bold text-white mb-4">
              ARENA KUIS CEPAT
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              60 detik. Jawab sebanyak mungkin. Raih skor tertinggi!
            </p>
            <button
              onClick={handleStart}
              className="px-12 py-4 bg-cyan-500 hover:bg-cyan-600 text-white text-2xl font-bold rounded-lg transition"
            >
              MULAI KUIS
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <QuizGame onComplete={handleComplete} />
        )}

        {gameState === 'results' && result && (
          <QuizResults result={result} onRetry={handleRetry} />
        )}
      </div>
    </div>
  );
}
