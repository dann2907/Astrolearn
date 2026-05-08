'use client';

import dynamic from 'next/dynamic';
import GameUI from '@/components/modules/game/GameUI';

const GameCanvasWithConfig = dynamic(
  () => import('@/components/modules/game/GameCanvasWithConfig'),
  {
    ssr: false,
    loading: () => <div className="w-full h-full bg-slate-900 rounded-xl animate-pulse flex items-center justify-center text-slate-500 font-bold">Inisialisasi Game...</div>
  }
);

export default function ExplorerPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-4xl aspect-[4/3]">
        <GameUI />
        <GameCanvasWithConfig />
      </div>
      <div className="mt-8 text-slate-400 text-sm">
        Use Arrow Keys to Navigate • Space to Shoot
      </div>
    </main>
  );
}
