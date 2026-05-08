import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  private progressBar!: Phaser.GameObjects.Graphics;
  private progressBox!: Phaser.GameObjects.Graphics;
  private loadingText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.createProgressBar();
    this.loadAssets();
    this.setupLoadEvents();
  }

  private createProgressBar() {
    const width = 320;
    const height = 50;
    const x = (this.cameras.main.width - width) / 2;
    const y = (this.cameras.main.height - height) / 2;

    // Background box
    this.progressBox = this.add.graphics();
    this.progressBox.fillStyle(0x222222, 0.8);
    this.progressBox.fillRect(x, y, width, height);

    // Progress bar
    this.progressBar = this.add.graphics();

    // Loading text
    this.loadingText = this.add.text(
      this.cameras.main.width / 2,
      y - 30,
      'Loading...',
      { fontSize: '20px', color: '#ffffff' }
    ).setOrigin(0.5);
  }

  private loadAssets() {
    // Placeholder: load fake assets to test progress bar
    // Since actual /assets/placeholder.png might not exist, we use a data URL or just rely on progress events
    // For now, let's load nothing and it will skip to 'complete' immediately, 
    // or we can add a few fake ones if we want to see the bar.
    for (let i = 0; i < 50; i++) {
        this.load.image(`placeholder_${i}`, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==');
    }
  }

  private setupLoadEvents() {
    this.load.on('progress', (value: number) => {
      const width = 320;
      const height = 50;
      const x = (this.cameras.main.width - width) / 2;
      const y = (this.cameras.main.height - height) / 2;

      this.progressBar.clear();
      this.progressBar.fillStyle(0x00ff00, 1);
      this.progressBar.fillRect(x + 10, y + 10, (width - 20) * value, height - 20);
    });

    this.load.on('complete', () => {
      this.progressBar.destroy();
      this.progressBox.destroy();
      this.loadingText.destroy();
    });
  }

  create() {
    // Smooth transition
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('MenuScene');
    });
  }
}
