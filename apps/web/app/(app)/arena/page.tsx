'use client';

import { useState } from 'react';
import { QuizGame } from '@/components/quiz/QuizGame';
import { QuizResults } from '@/components/quiz/QuizResults';
import type { QuizResult } from '@/lib/quiz/types';
import { BrainCircuit, Trophy, Zap, Clock, Target } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <div className="flex-1 flex flex-col p-4 md:p-8 lg:p-12">
      {gameState === 'menu' && (
        <div className="max-w-4xl mx-auto w-full flex flex-col gap-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
                <BrainCircuit className="w-10 h-10 text-cyan-400" /> ARENA KUIS
              </h1>
              <p className="text-slate-400 font-medium mt-2">Uji kecepatan dan ketepatan pengetahuan astronomimu.</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl px-5 py-3">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Skor Tertinggi</p>
                <p className="text-xl font-bold text-amber-400">12,450</p>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-cyan-600 to-blue-800 rounded-[2.5rem] p-10 md:p-16 text-center shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-white/20 transition-all duration-700" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl -ml-32 -mb-32" />
            
            <div className="relative z-10 space-y-8">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto shadow-inner border border-white/20">
                <Zap className="w-12 h-12 text-yellow-300 fill-yellow-300" />
              </div>
              
              <div className="space-y-3">
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">MISI KUIS CEPAT</h2>
                <p className="text-cyan-100 text-lg font-medium max-w-md mx-auto">60 detik. Jawab sebanyak mungkin. Dapatkan XP dan Stardust berlimpah!</p>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm font-bold text-white/80">
                <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full border border-white/10">
                  <Clock className="w-4 h-4" /> 60 Detik
                </div>
                <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full border border-white/10">
                  <Zap className="w-4 h-4" /> +100 XP / Soal
                </div>
              </div>

              <button
                onClick={handleStart}
                className="bg-white hover:bg-cyan-50 text-blue-900 px-12 py-5 rounded-2xl font-black text-xl tracking-widest transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                MULAI SEKARANG
              </button>
            </div>
          </motion.div>

          {/* Quick Tips */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Kecepatan", desc: "Semakin cepat menjawab, bonus skor bertambah.", icon: Zap, color: "text-yellow-400" },
              { label: "Akurasi", desc: "Jangan asal klik! Salah mengurangi nyawa.", icon: Target, color: "text-red-400" },
              { label: "Peringkat", desc: "Raih Top 10 untuk masuk ke Hall of Fame.", icon: Trophy, color: "text-amber-400" },
            ].map((tip) => (
              <div key={tip.label} className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 flex items-start gap-4">                <div className={`p-3 rounded-xl bg-slate-950 ${tip.color}`}>
                  <tip.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{tip.label}</h4>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col justify-center">
          <QuizGame onComplete={handleComplete} />
        </div>
      )}

      {gameState === 'results' && result && (
        <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col justify-center">
          <QuizResults result={result} onRetry={handleRetry} />
        </div>
      )}
    </div>
  );
}
