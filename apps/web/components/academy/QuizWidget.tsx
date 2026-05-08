"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Loader2, Sparkles, CheckCircle2, XCircle, ArrowRight, Zap, Trophy } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { toast } from 'sonner';

interface Question {
  id: string;
  question: string;
  options: string[];
  explanation: string;
}

interface QuizWidgetProps {
  subchapterId: string;
  onComplete?: () => void;
}

export default function QuizWidget({ subchapterId, onComplete }: QuizWidgetProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ questionId: string; selectedOption: number }[]>([]);
  const [result, setResult] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await apiClient.get(`/quiz/questions?subChapterId=${subchapterId}`);
        setQuestions(data);
      } catch (error) {
        toast.error("Gagal memuat kuis.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [subchapterId]);

  const handleNext = async () => {
    if (selectedOption === null) return;

    const newAnswers = [...answers, { questionId: questions[currentIndex].id, selectedOption }];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentIndex < questions.length - 1) {
      setCurrentCurrentIndex(prev => prev + 1);
    } else {
      // Submit results
      setSubmitting(true);
      try {
        const res = await apiClient.post('/quiz/quiz-results', {
          subchapterId,
          answers: newAnswers
        });
        setResult(res);
        if (res.passed) {
          toast.success(`Kuis Selesai! Kamu dapat ${res.levelUpInfo?.leveledUp ? 'level baru dan ' : ''}XP reward.`);
          if (onComplete) onComplete();
        } else {
          toast.error("Skor kamu belum cukup untuk lulus. Coba lagi!");
        }
      } catch (error) {
        toast.error("Gagal mengirim hasil kuis.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-12 bg-slate-900/50 rounded-3xl border border-slate-800">
      <Loader2 className="w-8 h-8 text-violet-500 animate-spin mb-4" />
      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Menyiapkan Kuis...</p>
    </div>
  );

  if (questions.length === 0) return null;

  if (result) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 md:p-12 bg-slate-900 rounded-3xl border border-slate-800 text-center space-y-8 shadow-2xl relative overflow-hidden"
      >
        <div className={`absolute inset-0 opacity-10 ${result.passed ? 'bg-emerald-500' : 'bg-red-500'}`} />
        
        <div className="relative z-10 space-y-6">
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${result.passed ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white shadow-lg'}`}>
            {result.passed ? <Trophy className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
          </div>
          
          <div>
            <h3 className="text-3xl font-black text-white tracking-tight mb-2">
              {result.passed ? 'Misi Berhasil!' : 'Misi Gagal'}
            </h3>
            <p className="text-slate-400 font-medium">
              Kamu menjawab {result.correctCount} dari {result.totalQuestions} soal dengan benar.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 inline-block min-w-[200px]">
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Skor Akhir</p>
             <p className={`text-5xl font-black ${result.passed ? 'text-emerald-400' : 'text-red-400'}`}>{result.score}</p>
          </div>

          {result.levelUpInfo?.leveledUp && (
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="bg-violet-600 px-6 py-3 rounded-xl inline-flex items-center gap-3 text-white font-bold"
            >
              <Sparkles className="w-5 h-5" />
              NAIK LEVEL: {result.levelUpInfo.newLevel} ({result.levelUpInfo.newRank})
            </motion.div>
          )}

          <div className="pt-4">
             {result.passed ? (
               <button onClick={() => window.location.href = '/'} className="bg-white text-slate-950 px-10 py-4 rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-transform active:scale-95">
                 KEMBALI KE DASHBOARD
               </button>
             ) : (
               <button onClick={() => window.location.reload()} className="bg-slate-800 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-slate-700 transition-colors">
                 COBA LAGI
               </button>
             )}
          </div>
        </div>
      </motion.div>
    );
  }

  const q = questions[currentIndex];

  return (
    <div className="p-8 md:p-12 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 h-1 bg-slate-800 w-full">
         <motion.div 
           className="h-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]"
           initial={{ width: 0 }}
           animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
         />
      </div>

      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-600/20 flex items-center justify-center text-violet-400">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Kuis Mini</span>
        </div>
        <span className="text-sm font-black text-white">SOAL {currentIndex + 1} / {questions.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentIndex}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          className="space-y-8"
        >
          <h3 className="text-2xl font-bold text-white leading-tight">{q.question}</h3>

          <div className="grid grid-cols-1 gap-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelectedOption(i)}
                className={`flex items-center gap-4 p-5 rounded-2xl border text-left transition-all ${
                  selectedOption === i 
                    ? 'bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-500/20' 
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-600'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black ${
                  selectedOption === i ? 'bg-white/20 text-white' : 'bg-slate-900 text-slate-500'
                }`}>
                  {String.fromCharCode(65 + i)}
                </div>
                <span className="font-bold">{opt}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 pt-8 border-t border-slate-800 flex justify-end">
        <button
          onClick={handleNext}
          disabled={selectedOption === null || submitting}
          className="bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-violet-500 text-white px-8 py-3 rounded-xl font-black text-sm flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-violet-500/20"
        >
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : currentIndex === questions.length - 1 ? 'SELESAIKAN' : 'LANJUT'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
