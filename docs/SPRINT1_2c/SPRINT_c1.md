# Phase 1: Arena Quiz Component

Task 1.1: Create Quiz Page
File: apps/web/src/app/arena/page.tsx
typescript'use client';

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
Acceptance Criteria:

- [x] Menu screen with start button
- [x] Transitions to quiz game
- [x] Shows results after completion
- [x] Retry restarts quiz

Task 1.2: Create QuizGame Component
File: apps/web/src/components/quiz/QuizGame.tsx
typescript'use client';

import { useState, useEffect, useRef } from 'react';
import { fetchQuizQuestions } from '@/lib/api/quiz';
import type { QuizQuestion, QuizAnswer, QuizResult } from '@/lib/quiz/types';

interface QuizGameProps {
  onComplete: (result: QuizResult) => void;
}

const QUIZ_DURATION = 60000; // 60 seconds

export function QuizGame({ onComplete }: QuizGameProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION);
  const [loading, setLoading] = useState(true);
  
  const startTimeRef = useRef<number>(Date.now());
  const questionStartRef = useRef<number>(Date.now());

  // Load questions
  useEffect(() => {
    fetchQuizQuestions(20).then(q => {
      setQuestions(q);
      setLoading(false);
      startTimeRef.current = Date.now();
      questionStartRef.current = Date.now();
    });
  }, []);

  // Timer
  useEffect(() => {
    if (loading) return;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = QUIZ_DURATION - elapsed;

      if (remaining <= 0) {
        finishQuiz();
      } else {
        setTimeLeft(remaining);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [loading]);

  const handleAnswer = (selectedIndex: number) => {
    const question = questions[currentIndex];
    const isCorrect = selectedIndex === question.correctIndex;
    const timeSpent = Date.now() - questionStartRef.current;

    // Calculate score
    let pointsEarned = 0;
    if (isCorrect) {
      pointsEarned = 100;
      const newCombo = combo + 1;
      setCombo(newCombo);
      setMaxCombo(Math.max(maxCombo, newCombo));
      
      // Combo bonus
      if (newCombo >= 3) {
        pointsEarned += newCombo * 10;
      }
    } else {
      pointsEarned = -25;
      setCombo(0);
    }

    setScore(prev => Math.max(0, prev + pointsEarned));

    // Record answer
    const answer: QuizAnswer = {
      questionId: question.id,
      selectedIndex,
      correct: isCorrect,
      timeSpent,
    };
    setAnswers(prev => [...prev, answer]);

    // Next question
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      questionStartRef.current = Date.now();
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const duration = Date.now() - startTimeRef.current;
    const correctCount = answers.filter(a => a.correct).length;
    const wrongCount = answers.length - correctCount;

    const result: QuizResult = {
      score,
      correctCount,
      wrongCount,
      comboMax: maxCombo,
      answers,
      duration,
    };

    onComplete(result);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-white text-2xl">Memuat soal...</div>
      </div>
    );
  }

  if (currentIndex >= questions.length) {
    return null; // Should not happen (finishQuiz called)
  }

  const question = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="bg-slate-800 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-white text-3xl font-bold">
            Skor: {score}
          </div>
          <div className="text-yellow-400 text-xl">
            Combo: {combo}x
          </div>
          <div className="text-cyan-400 text-2xl font-mono">
            {Math.ceil(timeLeft / 1000)}s
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-cyan-500 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-lg p-8 shadow-xl">
        <div className="text-gray-600 mb-2">
          Soal {currentIndex + 1} / {questions.length}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {question.text}
        </h2>

        {/* Options */}
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className="w-full text-left p-4 rounded-lg border-2 border-gray-300 hover:border-cyan-500 hover:bg-cyan-50 transition text-lg"
            >
              <span className="font-bold text-cyan-600 mr-3">
                {String.fromCharCode(65 + index)}.
              </span>
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
Acceptance Criteria:

- [x] Timer counts down from 60s
- [x] Questions display one at a time
- [x] Selecting answer shows next question
- [x] Score calculates correctly (+100, -25, combo)
- [x] Quiz ends at 0 seconds or last question
- [x] Result passed to parent

Task 1.3: Create QuizResults Component
File: apps/web/src/components/quiz/QuizResults.tsx
typescript'use client';

import { useEffect, useState } from 'react';
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

        
          href="/leaderboard"
          className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg transition"
        >
          Lihat Leaderboard
        </a>
      </div>
    </div>
  );
}
Acceptance Criteria:

- [x] Displays final score, accuracy, stats
- [x] Submits result to API
- [x] Shows XP earned
- [x] "Main Lagi" works
- [x] Link to leaderboard
