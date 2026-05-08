'use client';

import { useState } from 'react';
import GameCanvas from '@/components/modules/game/GameCanvas';
import { GAME_CONFIG } from '@/lib/game/config';

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
          <GameCanvas config={GAME_CONFIG} />
        </div>
      )}
    </div>
  );
}
