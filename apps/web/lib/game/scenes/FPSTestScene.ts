import Phaser from 'phaser';

export class FPSTestScene extends Phaser.Scene {
  private fpsText!: Phaser.GameObjects.Text;
  private sprites: Phaser.GameObjects.Sprite[] = [];

  constructor() {
    super({ key: 'FPSTestScene' });
  }

  create() {
    // FPS counter
    this.fpsText = this.add.text(10, 10, 'FPS: 0', {
      fontSize: '24px',
      color: '#00ff00',
    });

    // Create 50 moving sprites to test performance
    for (let i = 0; i < 50; i++) {
      const sprite = this.add.rectangle(
        Phaser.Math.Between(0, 800),
        Phaser.Math.Between(0, 600),
        20,
        20,
        0xff0000
      );
      
      this.physics.add.existing(sprite);
      const body = sprite.body as Phaser.Physics.Arcade.Body;
      body.setVelocity(
        Phaser.Math.Between(-100, 100),
        Phaser.Math.Between(-100, 100)
      );
      body.setBounce(1, 1);
      body.setCollideWorldBounds(true);

      this.sprites.push(sprite as any);
    }
  }

  update() {
    this.fpsText.setText(`FPS: ${Math.round(this.game.loop.actualFps)}`);
  }
}
