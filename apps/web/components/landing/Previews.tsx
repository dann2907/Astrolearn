'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, Gamepad2, BrainCircuit, Trophy, 
  ArrowRight, Sparkles, BookOpen, Star, Zap,
  CheckCircle2, Lock, Shield, MousePointerClick, Info
} from 'lucide-react';
import dynamic from 'next/dynamic';

const SolarSystem3D = dynamic(
  () => import('./SolarSystem3D').then((mod) => ({ default: mod.SolarSystem3D })),
  { ssr: false, loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950/50 space-y-4">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-blue-400 font-bold animate-pulse uppercase tracking-[0.2em] text-xs">Menginisialisasi Engine 3D...</p>
    </div>
  )}
);

interface PreviewProps {
  onCTA: () => void;
}

export const MateriPreview = ({ onCTA }: PreviewProps) => {
  const [selectedPlanet, setSelectedPlanet] = React.useState<any>(null);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-7xl mx-auto flex flex-col items-center py-10 space-y-16"
    >
      {/* Header Preview */}
      <div className="text-center space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
          <BookOpen className="w-4 h-4" /> Akademi Kosmik
        </div>
        <h2 className="text-5xl font-black text-white leading-tight">
          Kurikulum <span className="text-blue-400">Terstruktur</span> Antariksa.
        </h2>
        <p className="text-slate-400 text-lg font-medium leading-relaxed">
          Pelajari astronomi dari dasar hingga mahir dengan materi yang dirancang oleh para ahli.
        </p>
      </div>

      {/* Curriculum Spotlight */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
               <Sparkles className="w-6 h-6 text-amber-500" /> Materi Pembelajaran
            </h3>
            <p className="text-slate-400 font-medium">
              Eksplorasi modul interaktif yang mencakup seluruh spektrum pengetahuan astronomi modern.
            </p>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Sistem Tata Surya',
              'Evolusi Bintang',
              'Galaksi & Lubang Hitam',
              'Kosmologi Modern'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-200 font-bold bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> {item}
              </li>
            ))}
          </ul>
          <button 
            onClick={onCTA}
            className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20 w-fit"
          >
            Mulai Belajar Sekarang <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="relative group">
           <div className="absolute inset-0 bg-blue-600/20 rounded-[2.5rem] blur-3xl group-hover:bg-blue-600/30 transition-all" />
           <div className="relative bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 space-y-6 shadow-2xl overflow-hidden">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                 <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                       <Globe className="w-7 h-7 text-white" />
                    </div>
                    <div>
                       <h4 className="text-white font-bold">Bab 1: Tata Surya</h4>
                       <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">4 Sub-materi</p>
                    </div>
                 </div>
                 <span className="text-xs font-bold text-blue-400">Mulai</span>
              </div>
              <div className="space-y-4 opacity-50 select-none">
                 {[
                   { t: '1.1 Matahari: Sang Jantung', d: 'Mengenal bintang pusat kita.' },
                   { t: '1.2 Planet Terestrial', d: 'Merkurius, Venus, Bumi, dan Mars.' },
                 ].map((m, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-950 border border-slate-900">
                       <div className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center text-xs font-bold text-slate-600">{i+1}</div>
                       <div>
                          <h5 className="text-sm font-bold text-white">{m.t}</h5>
                          <p className="text-[10px] text-slate-500">{m.d}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Simulation Divider */}
      <div className="w-full flex flex-col items-center space-y-4 pt-8">
         <div className="w-px h-20 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent" />
         <h3 className="text-3xl font-black text-white text-center tracking-tight">
           Simulasi <span className="text-blue-400">3D Interaktif</span>
         </h3>
         <p className="text-slate-500 text-sm font-medium text-center">Klik & Geser untuk memutar. Gunakan Scroll untuk zoom.<br/>Klik matahari atau planet untuk detail.</p>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch min-h-[600px]">
        {/* 3D Simulation View */}
        <div className="lg:col-span-8 relative bg-[#020617] border border-slate-800/50 rounded-[2.5rem] overflow-hidden shadow-2xl min-h-[500px]">
          <SolarSystem3D onSelectPlanet={setSelectedPlanet} />
          
          <div className="absolute top-6 left-6 pointer-events-none">
             <div className="bg-slate-900/80 backdrop-blur px-4 py-2 rounded-xl border border-white/10 text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                Live Engine Rendering
             </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="lg:col-span-4 h-full">
          <div className="bg-[#0b1121] border border-slate-800 rounded-[2.5rem] p-8 h-full shadow-2xl relative overflow-hidden transition-all duration-300 min-h-[500px]">
            <AnimatePresence mode="wait">
              {!selectedPlanet ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center space-y-6"
                >
                  <div className="w-20 h-20 rounded-3xl border-2 border-dashed border-slate-700 flex items-center justify-center bg-slate-900/50">
                    <MousePointerClick className="w-8 h-8 text-blue-400 animate-bounce" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">Eksplorasi Planet</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Klik salah satu planet di simulasi 3D untuk melihat data astronomi dan fakta uniknya.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key={selectedPlanet.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col h-full space-y-8"
                >
                  <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg bg-slate-950 overflow-hidden relative border border-white/10">
                       <img 
                          src={selectedPlanet.texturePath} 
                          alt={selectedPlanet.name} 
                          className="w-full h-full object-cover scale-150"
                        />
                       <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-white tracking-tight">{selectedPlanet.name}</h2>
                      <p className="text-[10px] text-blue-400 font-bold tracking-widest uppercase">Data Astronomi</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { l: 'Jarak ke Matahari', v: selectedPlanet.distStr },
                      { l: 'Periode Revolusi', v: selectedPlanet.revStr }
                    ].map((stat, i) => (
                      <div key={i} className="bg-slate-900/50 rounded-2xl p-4 border border-slate-800">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">{stat.l}</p>
                        <p className="text-white font-bold">{stat.v}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto bg-blue-600/10 border border-blue-500/20 rounded-2xl p-5 space-y-2">
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-blue-400" />
                      <span className="text-xs font-black text-blue-400 uppercase tracking-widest">Fakta Unik</span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed font-medium italic">
                      &ldquo;{selectedPlanet.facts}&rdquo;
                    </p>
                  </div>

                  <button 
                    onClick={onCTA}
                    className="mt-6 w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20"
                  >
                    Buka Materi Lengkap
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const GamePreview = ({ onCTA }: PreviewProps) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="w-full max-w-5xl mx-auto flex flex-col items-center text-center py-10"
  >
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">
      <Zap className="w-4 h-4" /> Eskadron Penjelajah
    </div>
    <h2 className="text-6xl font-black text-white mb-6">
      Tembak <span className="text-purple-400">Asteroid</span>, Selamatkan Galaksi.
    </h2>
    <p className="text-slate-400 text-lg font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
      Uji ketangkasanmu dalam minigame shooter bertema luar angkasa. Kumpulkan XP dan Stardust untuk upgrade pangkatmu!
    </p>
    
    <div className="relative w-full aspect-video max-w-4xl bg-slate-950 rounded-[2rem] border-4 border-slate-900 shadow-2xl overflow-hidden group">
       <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 group-hover:scale-105 transition-transform duration-[10s]" />
       <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
       
       <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-[120px] filter drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]"
          >
            🚀
          </motion.div>
       </div>

       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
          <button 
            onClick={onCTA}
            className="bg-purple-600 hover:bg-purple-500 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-purple-600/40"
          >
            Mainkan Sekarang
          </button>
       </div>
       
       <div className="absolute top-6 right-6 flex items-center gap-3 bg-slate-900/80 backdrop-blur px-4 py-2 rounded-xl border border-white/10">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-white font-bold text-sm">Top Score: 12,450</span>
       </div>
    </div>
  </motion.div>
);

export const QuizPreview = ({ onCTA }: PreviewProps) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-10"
  >
    <div className="relative order-2 md:order-1">
       <div className="absolute inset-0 bg-cyan-600/20 rounded-3xl blur-3xl" />
       <div className="relative bg-white rounded-3xl p-8 space-y-6 shadow-2xl">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
             <span className="text-xs font-black text-cyan-600 uppercase tracking-widest">Pertanyaan #1</span>
             <span className="text-xs font-bold text-slate-400">60s</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">Apa nama planet terbesar di sistem tata surya kita?</h3>
          <div className="space-y-3">
             {['Saturnus', 'Jupiter', 'Neptunus', 'Mars'].map((opt, i) => (
                <div 
                  key={i} 
                  className={`p-4 rounded-xl border-2 font-bold transition-all ${
                    opt === 'Jupiter' ? 'border-cyan-500 bg-cyan-50 text-cyan-700' : 'border-slate-100 text-slate-400'
                  }`}
                >
                  <span className="mr-3">{String.fromCharCode(65 + i)}.</span> {opt}
                </div>
             ))}
          </div>
          <div className="bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest p-2 rounded text-center">
             Benar! +100 XP
          </div>
       </div>
    </div>
    <div className="space-y-6 text-left order-1 md:order-2">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest">
        <BrainCircuit className="w-4 h-4" /> Arena Kuis
      </div>
      <h2 className="text-5xl font-black text-white leading-tight">
        Uji Nyali <span className="text-cyan-400">Pengetahuan</span> Kosmik.
      </h2>
      <p className="text-slate-400 text-lg font-medium leading-relaxed">
        60 detik tantangan. Jawab sebanyak-banyaknya, raih combo, dan puncaki leaderboard global!
      </p>
      <div className="grid grid-cols-2 gap-4">
         <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <h4 className="text-cyan-400 font-black text-2xl">100+</h4>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Soal Unik</p>
         </div>
         <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <h4 className="text-yellow-400 font-black text-2xl">Live</h4>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Leaderboard</p>
         </div>
      </div>
      <button 
        onClick={onCTA}
        className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg shadow-cyan-600/20 w-full md:w-fit justify-center"
      >
        Mulai Arena <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  </motion.div>
);

export const ProgressPreview = ({ onCTA }: PreviewProps) => (
  <motion.div 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-10"
  >
    <div className="space-y-6 text-left">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest">
        <Trophy className="w-4 h-4" /> RPG Progression
      </div>
      <h2 className="text-5xl font-black text-white leading-tight">
        Bangun <span className="text-orange-400">Legacy</span> Antar Bintang.
      </h2>
      <p className="text-slate-400 text-lg font-medium leading-relaxed">
        Kumpulkan XP dari kuis dan materi, naikkan levelmu, dan raih pangkat Laksamana yang legendaris.
      </p>
      <div className="space-y-4">
         {[
           { l: 'Kadet', v: 'Level 1-3' },
           { l: 'Navigator', v: 'Level 4-6' },
           { l: 'Kapten Bintang', v: 'Level 7-9' },
           { l: 'Laksamana', v: 'Level 10+' }
         ].map((p, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-800">
               <span className="text-sm font-bold text-white">{p.l}</span>
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{p.v}</span>
            </div>
         ))}
      </div>
      <button 
        onClick={onCTA}
        className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg shadow-orange-600/20"
      >
        Lihat Profile <ArrowRight className="w-4 h-4" />
      </button>
    </div>
    <div className="grid grid-cols-2 gap-4">
       {[
         { icon: Trophy, color: 'text-yellow-500', label: 'Star Pioneer' },
         { icon: Star, color: 'text-blue-500', label: 'Fast Learner' },
         { icon: Zap, color: 'text-purple-500', label: 'Top Gunner' },
         { icon: Shield, color: 'text-emerald-500', label: 'Planet Keeper' }
       ].map((b, i) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 1.05 }}
            className="aspect-square rounded-3xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-4 text-center space-y-3"
          >
             <div className={`w-16 h-16 rounded-full bg-slate-950 flex items-center justify-center border border-white/5 shadow-inner ${b.color}`}>
                <b.icon className="w-8 h-8 fill-current" />
             </div>
             <p className="text-xs font-black text-white uppercase tracking-widest">{b.label}</p>
          </motion.div>
       ))}
    </div>
  </motion.div>
);
