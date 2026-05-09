'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { submitQuizResult } from '@/lib/api/quiz';
import type { QuizResult } from '@/lib/quiz/types';

interface QuizResultsProps {
  result: QuizResult;
  onRetry: () => void;
}

export function QuizResults({ result, onRetry }: QuizResultsProps) {
  const [xpEarned, setXpEarned] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(true);

  useEffect(() => {
    submitQuizResult(result)
      .then(data => {
        setXpEarned(data.xp);
      })
      .catch(err => {
        console.error('Failed to submit result:', err);
      })
      .finally(() => {
        setSubmitting(false);
      });
  }, [result]);

  const accuracy = result.correctCount + result.wrongCount > 0
    ? (result.correctCount / (result.correctCount + result.wrongCount)) * 100
    : 0;

  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <h1 className="text-5xl font-bold text-white mb-8">
        HASIL KUIS
      </h1>

      <div className="bg-white rounded-lg p-8 shadow-xl mb-8">
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <div className="text-gray-600 mb-2">Skor Akhir</div>
            <div className="text-5xl font-bold text-cyan-600">
              {result.score}
            </div>
          </div>

          <div>
            <div className="text-gray-600 mb-2">Akurasi</div>
            <div className="text-5xl font-bold text-green-600">
              {accuracy.toFixed(0)}%
            </div>
          </div>

          <div>
            <div className="text-gray-600 mb-2">Benar / Salah</div>
            <div className="text-3xl font-bold text-gray-900">
              {result.correctCount} / {result.wrongCount}
            </div>
          </div>

          <div>
            <div className="text-gray-600 mb-2">Combo Terbaik</div>
            <div className="text-3xl font-bold text-yellow-600">
              {result.comboMax}x
            </div>
          </div>
        </div>

        {submitting && (
          <div className="text-gray-600">
            Menghitung reward...
          </div>
        )}

        {!submitting && xpEarned !== null && (
          <div className="text-2xl font-bold text-purple-600">
            +{xpEarned} XP
          </div>
        )}
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={onRetry}
          className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg transition"
        >
          Main Lagi
        </button>

        <Link
          href="/leaderboard"
          className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg transition"
        >
          Lihat Leaderboard
        </Link>
      </div>
    </div>
  );
}
