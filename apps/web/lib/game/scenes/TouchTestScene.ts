import Phaser from 'phaser';

export class TouchTestScene extends Phaser.Scene {
  private touchText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'TouchTestScene' });
  }

  create() {
    this.touchText = this.add.text(400, 300, 'Tap anywhere', {
      fontSize: '32px',
      color: '#ffffff',
    }).setOrigin(0.5);

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.add.circle(pointer.x, pointer.y, 10, 0x00ff00);
      this.touchText.setText(`Touch: ${pointer.x.toFixed(0)}, ${pointer.y.toFixed(0)}`);
    });
  }
}
