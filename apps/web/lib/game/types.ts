export type GameState = 'BOOT' | 'PRELOAD' | 'MENU' | 'PLAYING' | 'GAMEOVER';

export interface GameScore {
  stardust: number;
  xp: number;
}
