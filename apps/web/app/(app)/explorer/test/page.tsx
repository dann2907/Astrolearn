'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const GameCanvasWithConfig = dynamic(
  () => import('@/components/modules/game/GameCanvasWithConfig'),
  { ssr: false, loading: () => <div className="w-full h-full bg-slate-800 rounded-xl animate-pulse" /> }
);

export default function GameTestPage() {
  const [mountCount, setMountCount] = useState(0);
  const [isMounted, setIsMounted] = useState(true);

  const toggleMount = () => {
    setIsMounted(!isMounted);
    if (!isMounted) setMountCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen p-8 bg-slate-900">
      <div className="mb-4 space-x-4 flex items-center">
        <button 
          onClick={toggleMount}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors"
        >
          {isMounted ? 'Unmount' : 'Mount'} Game
        </button>
        <span className="text-white font-mono">
          Mount Count: {mountCount}
        </span>
      </div>
      
      {isMounted && (
        <div className="w-full max-w-4xl aspect-[4/3] mx-auto">
          <GameCanvasWithConfig />
        </div>
      )}
    </div>
  );
}
