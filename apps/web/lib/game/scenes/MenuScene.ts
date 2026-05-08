import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    const { width, height } = this.cameras.main;

    // Title
    this.add.text(width / 2, height / 3, 'ESKADRON PENJELAJAH', {
      fontSize: '48px',
      color: '#00ffff',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    // Start button
    const startButton = this.add.text(width / 2, height / 2, 'MULAI', {
      fontSize: '32px',
      color: '#ffffff',
      backgroundColor: '#0066cc',
      padding: { x: 40, y: 20 },
    }).setOrigin(0.5).setInteractive();

    startButton.on('pointerover', () => {
      startButton.setStyle({ backgroundColor: '#0088ff' });
    });

    startButton.on('pointerout', () => {
      startButton.setStyle({ backgroundColor: '#0066cc' });
    });

    startButton.on('pointerdown', () => {
      this.scene.start('GameScene');
    });
  }
}
