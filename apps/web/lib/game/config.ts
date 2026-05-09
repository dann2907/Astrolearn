import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { PreloadScene } from './scenes/PreloadScene';
import { MenuScene } from './scenes/MenuScene';
import { GameScene } from './scenes/GameScene';
import { QuestionOverlayScene } from './scenes/QuestionOverlayScene';
import { GameOverScene } from './scenes/GameOverScene';

export const GAME_CONFIG: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#000000',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0, x: 0 },
      debug: process.env.NODE_ENV === 'development',
    },
  },
  audio: {
    disableWebAudio: true,
  },
  scene: [BootScene, PreloadScene, MenuScene, GameScene, QuestionOverlayScene, GameOverScene],
};
