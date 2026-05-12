'use client';

import dynamic from 'next/dynamic';
import GameUI from '@/components/modules/game/GameUI';
import { Rocket, Zap, Crosshair } from 'lucide-react';

const GameCanvasWithConfig = dynamic(
  () => import('@/components/modules/game/GameCanvasWithConfig'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-slate-900 rounded-[2rem] border border-slate-800 animate-pulse flex flex-col items-center justify-center gap-4 text-slate-500 font-bold">
        <Rocket className="w-12 h-12 animate-bounce" />
        <p className="uppercase tracking-[0.2em] text-xs">Inisialisasi Sistem Navigasi...</p>
      </div>
    )
  }
);

export default function ExplorerPage() {
  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-80px)] p-4 md:p-6 overflow-hidden">
      {/* Game Header Info */}
      <div className="flex justify-between items-center mb-4 px-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-violet-600/20 border border-violet-500/50 rounded-xl flex items-center justify-center">
            <Rocket className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h1 className="text-lg font-black text-white tracking-tight leading-tight">EXPLORER SQUADRON</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Misi: Penjaga Orbit</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-black uppercase tracking-widest text-slate-400 bg-slate-900/50 px-6 py-2.5 rounded-full border border-slate-800">
          <div className="flex items-center gap-2">
            <Crosshair className="w-3.5 h-3.5 text-red-500" /> [SPACE] TEMBAK
          </div>
          <div className="w-px h-3 bg-slate-800" />
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-yellow-500" /> [ARROWS] NAVIGASI
          </div>
        </div>
      </div>

      {/* Flexible Game Viewport */}
      <div className="flex-1 relative bg-slate-950 rounded-[2rem] border border-slate-800/50 shadow-2xl overflow-hidden group">
        <div className="absolute inset-0 z-10 pointer-events-none border-[12px] border-slate-950/20 rounded-[2rem]" />
        
        <div className="w-full h-full relative">
          <GameUI />
          <GameCanvasWithConfig />
        </div>

        {/* HUD Overlay Elements */}
        <div className="absolute bottom-6 left-6 z-20 flex gap-2">
          <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">Sistem Online</span>
          </div>
        </div>
      </div>
    </div>
  );
}
