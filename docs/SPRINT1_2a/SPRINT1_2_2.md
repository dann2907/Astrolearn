# Phase 2: Game Scenes (After Spike Passes)

Task 2.1: BootScene - Configuration Loader
File: apps/web/src/lib/game/scenes/BootScene.ts
typescriptimport Phaser from 'phaser';

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
Acceptance Criteria:

- [x] Scene starts automatically
- [x] Transitions to PreloadScene
- [x] Console logs visible

Task 2.2: PreloadScene - Asset Loader with Progress Bar
File: apps/web/src/lib/game/scenes/PreloadScene.ts
typescriptimport Phaser from 'phaser';

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
    // TODO: Load actual game assets
    // Placeholder: load fake assets to test progress bar
    for (let i = 0; i < 10; i++) {
      this.load.image(`placeholder_${i}`, '/assets/placeholder.png');
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
    this.scene.start('MenuScene');
  }
}
Acceptance Criteria:

- [x] Progress bar fills from 0 to 100%
- [x] Transitions to MenuScene when done
- [x] No visual glitches

Task 2.3: MenuScene - Start Button
File: apps/web/src/lib/game/scenes/MenuScene.ts
typescriptimport Phaser from 'phaser';

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
Acceptance Criteria:

- [x] Title displays correctly
- [x] Button hover effect works
- [x] Click starts GameScene

Task 2.4: GameScene - Basic Spaceship Control
File: apps/web/src/lib/game/scenes/GameScene.ts
typescriptimport Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Rectangle;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: any;
  private bullets!: Phaser.Physics.Arcade.Group;
  private lastFired = 0;
  private fireRate = 250; // ms
  private scoreText!: Phaser.GameObjects.Text;
  private score = 0;

  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    this.setupPlayer();
    this.setupControls();
    this.setupBullets();
    this.setupUI();
  }

  private setupPlayer() {
    // Placeholder: Blue rectangle as spaceship
    this.player = this.add.rectangle(400, 500, 40, 60, 0x00aaff);
    this.physics.add.existing(this.player);
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    body.setCollideWorldBounds(true);
  }

  private setupControls() {
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.wasd = this.input.keyboard!.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });
  }

  private setupBullets() {
    this.bullets = this.physics.add.group({
      defaultKey: 'bullet',
      maxSize: 30,
    });
  }

  private setupUI() {
    this.scoreText = this.add.text(16, 16, 'Skor: 0', {
      fontSize: '24px',
      color: '#ffffff',
    });
  }

  update(time: number) {
    this.handleMovement();
    this.handleShooting(time);
    this.cleanupBullets();
  }

  private handleMovement() {
    const speed = 300;
    const body = this.player.body as Phaser.Physics.Arcade.Body;

    body.setVelocity(0);

    if (this.cursors.left.isDown || this.wasd.left.isDown) {
      body.setVelocityX(-speed);
    } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
      body.setVelocityX(speed);
    }

    if (this.cursors.up.isDown || this.wasd.up.isDown) {
      body.setVelocityY(-speed);
    } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
      body.setVelocityY(speed);
    }
  }

  private handleShooting(time: number) {
    if (
      (this.cursors.space.isDown || this.wasd.space.isDown) &&
      time > this.lastFired + this.fireRate
    ) {
      this.fireBullet();
      this.lastFired = time;
    }
  }

  private fireBullet() {
    const bullet = this.add.rectangle(
      this.player.x,
      this.player.y - 30,
      4,
      12,
      0xffff00
    );
    this.physics.add.existing(bullet);
    const body = bullet.body as Phaser.Physics.Arcade.Body;
    body.setVelocityY(-500);

    this.bullets.add(bullet);
  }

  private cleanupBullets() {
    this.bullets.children.each((bullet: any) => {
      if (bullet.y < 0) {
        bullet.destroy();
      }
    });
  }
}
Acceptance Criteria:

- [x] Spaceship moves with arrow keys and WASD
- [x] Spaceship shoots yellow bullets with spacebar
- [x] Bullets disappear offscreen
- [x] Movement bounded to screen edges

Task 2.5: Update Game Config with All Scenes
File: apps/web/src/lib/game/config.ts
typescriptimport { BootScene } from './scenes/BootScene';
import { PreloadScene } from './scenes/PreloadScene';
import { MenuScene } from './scenes/MenuScene';
import { GameScene } from './scenes/GameScene';

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
      debug: false,
    },
  },
  scene: [BootScene, PreloadScene, MenuScene, GameScene],
};
Acceptance Criteria:

- [x] All scenes load in correct order
- [x] No scene transition errors
