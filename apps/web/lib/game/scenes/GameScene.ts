import Phaser from 'phaser';

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
    this.setupBackButton();
  }

  private setupBackButton() {
    const backButton = this.add.text(16, 560, '← Menu', {
      fontSize: '20px',
      color: '#ffffff',
      backgroundColor: '#cc0000',
      padding: { x: 20, y: 10 },
    }).setOrigin(0, 0.5).setInteractive();

    backButton.on('pointerover', () => {
      backButton.setStyle({ backgroundColor: '#ff0000' });
    });

    backButton.on('pointerout', () => {
      backButton.setStyle({ backgroundColor: '#cc0000' });
    });

    backButton.on('pointerdown', () => {
      this.scene.start('MenuScene');
    });
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
    this.bullets = this.physics.add.group();
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
    const x = this.player.x;
    const y = this.player.y - 30;
    
    const bullet = this.add.rectangle(x, y, 4, 12, 0xffff00);
    
    // 1. Add to group
    this.bullets.add(bullet);
    
    // 2. Add physics
    this.physics.add.existing(bullet);
    
    const body = bullet.body as Phaser.Physics.Arcade.Body;
    
    // 3. Set velocity AFTER adding to physics world
    body.setAllowGravity(false);
    body.setVelocityY(-500);
    
    console.log(`Bullet fired at ${x},${y}. Velocity: ${body.velocity.y}`);
  }

  private cleanupBullets() {
    this.bullets.getChildren().forEach((bullet: any) => {
      if (bullet.y < -50) {
        bullet.destroy();
      }
    });
  }
}
