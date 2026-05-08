'use client';

import GameCanvas from './GameCanvas';
import { GAME_CONFIG } from '@/lib/game/config';

export default function GameCanvasWithConfig() {
  return <GameCanvas config={GAME_CONFIG} />;
}
