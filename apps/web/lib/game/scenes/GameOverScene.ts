import Phaser from 'phaser';
import type { GameResult, GameReward } from '@/lib/game/types';

export class GameOverScene extends Phaser.Scene {
  private result!: GameResult;
  private reward?: GameReward;

  constructor() {
    super({ key: 'GameOverScene' });
  }

  init(data: { result: GameResult; reward?: GameReward }) {
    this.result = data.result;
    this.reward = data.reward;
  }

  create() {
    const { width, height } = this.cameras.main;

    // Background
    this.add.rectangle(0, 0, width, height, 0x000000, 0.9).setOrigin(0);

    // Title
    this.add.text(width / 2, 100, 'GAME OVER', {
      fontSize: '64px',
      color: '#ff0000',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    // Stats
    const statsY = 220;
    const lineHeight = 50;

    this.add.text(width / 2, statsY, `Skor: ${this.result.score}`, {
      fontSize: '32px',
      color: '#ffffff',
    }).setOrigin(0.5);

    this.add.text(width / 2, statsY + lineHeight, 
      `Durasi: ${Math.floor(this.result.duration)}s`, {
      fontSize: '24px',
      color: '#aaaaaa',
    }).setOrigin(0.5);

    const correctAnswers = this.result.answers.filter(a => a.correct).length;
    this.add.text(width / 2, statsY + lineHeight * 2, 
      `Jawaban Benar: ${correctAnswers}/${this.result.answers.length}`, {
      fontSize: '24px',
      color: '#00ff00',
    }).setOrigin(0.5);

    // Rewards (if available)
    if (this.reward) {
      this.add.text(width / 2, statsY + lineHeight * 3.5, 
        `+${this.reward.xp} XP`, {
        fontSize: '28px',
        color: '#00ffff',
      }).setOrigin(0.5);

      this.add.text(width / 2, statsY + lineHeight * 4.5, 
        `+${this.reward.stardust} Stardust`, {
        fontSize: '28px',
        color: '#ffaa00',
      }).setOrigin(0.5);

      if (this.reward.flagged) {
        this.add.text(width / 2, statsY + lineHeight * 5.5, 
          '⚠️ Skor tidak wajar - reward tidak diberikan', {
          fontSize: '20px',
          color: '#ff0000',
        }).setOrigin(0.5);
      }
    } else {
      this.add.text(width / 2, statsY + lineHeight * 3.5, 
        'Menghitung reward...', {
        fontSize: '24px',
        color: '#888888',
      }).setOrigin(0.5);
    }

    // Buttons
    this.createButtons(width, height);
  }

  private createButtons(width: number, height: number) {
    const buttonY = height - 100;

    // Retry button
    const retryButton = this.add.text(width / 2 - 120, buttonY, 'Main Lagi', {
      fontSize: '24px',
      color: '#ffffff',
      backgroundColor: '#0066cc',
      padding: { x: 30, y: 15 },
    }).setOrigin(0.5).setInteractive();

    retryButton.on('pointerover', () => {
      retryButton.setStyle({ backgroundColor: '#0088ff' });
    });

    retryButton.on('pointerout', () => {
      retryButton.setStyle({ backgroundColor: '#0066cc' });
    });

    retryButton.on('pointerdown', () => {
      this.scene.start('GameScene');
    });

    // Menu button
    const menuButton = this.add.text(width / 2 + 120, buttonY, 'Menu', {
      fontSize: '24px',
      color: '#ffffff',
      backgroundColor: '#666666',
      padding: { x: 30, y: 15 },
    }).setOrigin(0.5).setInteractive();

    menuButton.on('pointerover', () => {
      menuButton.setStyle({ backgroundColor: '#888888' });
    });

    menuButton.on('pointerout', () => {
      menuButton.setStyle({ backgroundColor: '#666666' });
    });

    menuButton.on('pointerdown', () => {
      this.scene.start('MenuScene');
    });
  }
}
