'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
  const correctSound = useRef<HTMLAudioElement | null>(null);
  const wrongSound = useRef<HTMLAudioElement | null>(null);

  const finishQuiz = useCallback(() => {
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
  }, [answers, score, maxCombo, onComplete]);

  // Load questions and sounds
  useEffect(() => {
    fetchQuizQuestions(20).then(q => {
      setQuestions(q);
      setLoading(false);
      startTimeRef.current = Date.now();
      questionStartRef.current = Date.now();
    });

    // Initialize sounds (defensive)
    correctSound.current = new Audio('/sounds/correct.mp3');
    wrongSound.current = new Audio('/sounds/wrong.mp3');
    
    // Low volume
    if (correctSound.current) correctSound.current.volume = 0.4;
    if (wrongSound.current) wrongSound.current.volume = 0.3;
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
  }, [loading, finishQuiz]);

  const handleAnswer = (selectedIndex: number) => {
    const question = questions[currentIndex];
    const isCorrect = selectedIndex === question.correctIndex;
    const timeSpent = Date.now() - questionStartRef.current;

    // Play sound (ignore if failed)
    if (isCorrect) {
      correctSound.current?.play().catch(() => {});
    } else {
      wrongSound.current?.play().catch(() => {});
    }

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
          <div className={`text-2xl font-mono transition-colors ${
            timeLeft < 10000 ? 'text-red-500 animate-pulse' : 'text-cyan-400'
          }`}>
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
