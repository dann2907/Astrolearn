'use client';

import { useEffect, useRef } from 'react';
import Phaser from 'phaser';

interface GameCanvasProps {
  config: Phaser.Types.Core.GameConfig;
}

export default function GameCanvas({ config }: GameCanvasProps) {
  const gameRef = useRef<Phaser.Game | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return;

    // Initialize Phaser
    gameRef.current = new Phaser.Game({
      ...config,
      parent: containerRef.current,
    });

    // Cleanup on unmount
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [config]);

  return (
    <div 
      ref={containerRef} 
      className="game-container w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/10"
      style={{ touchAction: 'none' }} // Prevent mobile scroll
    />
  );
}
