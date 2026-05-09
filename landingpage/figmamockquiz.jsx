import React, { useState } from 'react';
import { Rocket, User, Trophy, ArrowRight, RotateCcw } from 'lucide-react';

export default function ArenaKuis() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  // Mockup Data Kuis
  const quizData = [
    {
      question: "Planet mana dalam tata surya kita yang dijuluki sebagai 'Planet Merah'?",
      options: ["Venus", "Mars", "Jupiter", "Saturnus"],
      correctIndex: 1
    },
    {
      question: "Benda langit apakah yang menjadi pusat revolusi bagi seluruh planet di Tata Surya?",
      options: ["Bulan", "Bintang Sirius", "Matahari", "Lubang Hitam"],
      correctIndex: 2
    },
    {
      question: "Planet terbesar dalam Tata Surya kita adalah...",
      options: ["Bumi", "Uranus", "Neptunus", "Jupiter"],
      correctIndex: 3
    },
    {
      question: "Siapakah nama pesawat luar angkasa pertama yang berhasil mendarat di Bulan?",
      options: ["Apollo 11", "Voyager 1", "Sputnik", "Curiosity"],
      correctIndex: 0
    }
  ];

  const handleSelectOption = (index) => {
    setSelectedOption(index);
  };

  const handleNextQuestion = () => {
    // Cek jawaban benar
    if (selectedOption === quizData[currentQuestionIndex].correctIndex) {
      setScore(score + 100);
    }

    // Pindah ke soal berikutnya atau selesai
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null); // Reset pilihan untuk soal baru
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsFinished(false);
    setScore(0);
  };

  const progressPercentage = ((currentQuestionIndex + 1) / quizData.length) * 100;
  const isLastQuestion = currentQuestionIndex === quizData.length - 1;

  // --- KOMPONEN NAVBAR ---
  const renderHeader = () => (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 text-violet-400 cursor-pointer">
          <Rocket className="w-6 h-6" />
          <span className="font-bold text-xl tracking-wider text-white">ASTROLEARN</span>
        </div>
        
        {/* Profile / Login */}
        <div className="flex items-center gap-3 bg-slate-800 rounded-full pl-1 pr-4 py-1 border border-slate-700 cursor-pointer hover:border-violet-500 transition shadow-sm">
          <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center border-2 border-slate-900">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="text-white text-xs font-bold">Login / Profile</div>
        </div>
      </div>
    </header>
  );

  // --- LAYAR KUIS SELESAI ---
  if (isFinished) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-violet-500/30">
        {renderHeader()}
        <div className="max-w-3xl mx-auto mt-20 px-4 pb-20 text-center">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <Trophy className="w-48 h-48 transform rotate-12" />
            </div>
            <Trophy className="w-20 h-20 text-amber-400 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-white mb-2">Kuis Selesai!</h1>
            <p className="text-slate-400 mb-8">Kerja bagus, Kadet! Ini adalah hasil evaluasimu.</p>
            
            <div className="inline-block bg-slate-800/80 border border-slate-700 px-8 py-6 rounded-2xl mb-8">
              <p className="text-sm text-slate-400 uppercase tracking-widest mb-1">Total Skor</p>
              <p className="text-5xl font-bold text-fuchsia-400">{score}</p>
            </div>

            <div className="flex justify-center">
              <button 
                onClick={resetQuiz}
                className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 px-8 rounded-full shadow-[0_0_20px_rgba(124,58,237,0.3)] transition transform hover:-translate-y-1"
              >
                <RotateCcw className="w-5 h-5" /> Ulangi Kuis
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- LAYAR KUIS AKTIF ---
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-violet-500/30 flex flex-col">
      {renderHeader()}

      <div className="flex-1 max-w-4xl w-full mx-auto mt-10 md:mt-16 px-4 pb-12 flex flex-col">
        
        {/* Judul Kuis */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-10 md:mb-14">
          Kuis Tata Surya
        </h1>

        {/* Indikator Soal & Progress Bar */}
        <div className="flex justify-between items-center mb-4 px-2 md:px-6">
          <span className="text-slate-400 font-medium text-sm md:text-base">
            Soal {currentQuestionIndex + 1} dari {quizData.length}
          </span>
          <div className="w-48 md:w-64 h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <div 
              className="h-full bg-violet-500 transition-all duration-500 ease-out rounded-full shadow-[0_0_10px_rgba(139,92,246,0.6)]" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Kotak Konten Utama (Mirip referensi gambar) */}
        <div className="bg-[#0f172a] border border-slate-700/80 rounded-3xl p-6 md:p-12 shadow-2xl flex-1 flex flex-col justify-center min-h-[350px]">
          
          <h2 className="text-xl md:text-2xl text-white font-semibold text-center mb-10 leading-relaxed max-w-2xl mx-auto">
            {quizData[currentQuestionIndex].question}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto w-full">
            {quizData[currentQuestionIndex].options.map((option, index) => {
              const isSelected = selectedOption === index;
              return (
                <button
                  key={index}
                  onClick={() => handleSelectOption(index)}
                  className={`
                    w-full text-left p-4 md:p-5 rounded-xl font-medium transition-all duration-200 border-2 
                    ${isSelected 
                      ? 'bg-violet-900/40 border-violet-500 text-white shadow-[0_0_15px_rgba(124,58,237,0.2)]' 
                      : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-500'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                      ${isSelected ? 'border-violet-400 bg-violet-500/20' : 'border-slate-500'}
                    `}>
                      {isSelected && <div className="w-2.5 h-2.5 bg-violet-400 rounded-full"></div>}
                    </div>
                    <span className="text-sm md:text-base">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tombol Selanjutnya */}
        <div className="mt-10 flex justify-center">
          <button 
            onClick={handleNextQuestion}
            disabled={selectedOption === null}
            className={`
              flex items-center justify-center gap-2 font-bold py-4 px-10 rounded-full w-full max-w-xs transition-all transform 
              ${selectedOption !== null 
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:-translate-y-1' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }
            `}
          >
            {isLastQuestion ? 'Selesaikan Kuis' : 'Soal Selanjutnya'} 
            {selectedOption !== null && !isLastQuestion && <ArrowRight className="w-5 h-5" />}
          </button>
        </div>

      </div>
    </div>
  );
}