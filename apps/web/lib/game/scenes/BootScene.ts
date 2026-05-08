import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // Load minimal config/data
    console.log('BootScene: Loading configuration...');
  }

  create() {
    console.log('BootScene: Configuration loaded');
    this.scene.start('PreloadScene');
  }
}
