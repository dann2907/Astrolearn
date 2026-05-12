import Phaser from 'phaser';
import type { Question } from '@/lib/game/types';

export class QuestionOverlayScene extends Phaser.Scene {
  private question!: Question;
  private onAnswerCallback!: (selectedIndex: number) => void;
  private background!: Phaser.GameObjects.Rectangle;

  constructor() {
    super({ key: 'QuestionOverlayScene' });
  }

  init(data: { question: Question; onAnswer: (index: number) => void }) {
    this.question = data.question;
    this.onAnswerCallback = data.onAnswer;
  }

  create() {
    if (!this.question) {
      console.warn('QuestionOverlayScene: No question data');
      this.scene.stop();
      return
    }
    const { width, height } = this.cameras.main;

    // Semi-transparent background
    this.background = this.add.rectangle(0, 0, width, height, 0x000000, 0.85);
    this.background.setOrigin(0);

    // Question panel
    const panelWidth = 600;
    const panelHeight = 400;
    const panelX = (width - panelWidth) / 2;
    const panelY = (height - panelHeight) / 2;

    const panel = this.add.rectangle(
      panelX,
      panelY,
      panelWidth,
      panelHeight,
      0x1a1a2e
    );
    panel.setOrigin(0);
    panel.setStrokeStyle(4, 0x00ffff);

    // Question text
    this.add.text(
      width / 2,
      panelY + 60,
      this.question.text,
      {
        fontSize: '24px',
        color: '#ffffff',
        align: 'center',
        wordWrap: { width: panelWidth - 40 },
      }
    ).setOrigin(0.5);

    // Answer buttons
    this.createAnswerButtons(panelX, panelY, panelWidth);
  }

  private createAnswerButtons(panelX: number, panelY: number, panelWidth: number) {
    const buttonWidth = panelWidth - 60;
    const buttonHeight = 50;
    const startY = panelY + 150;
    const spacing = 70;

    this.question.options.forEach((option, index) => {
      const buttonY = startY + index * spacing;
      
      const button = this.add.rectangle(
        panelX + 30,
        buttonY,
        buttonWidth,
        buttonHeight,
        0x0066cc
      );
      button.setOrigin(0);
      button.setInteractive();

      this.add.text(
        panelX + 30 + buttonWidth / 2,
        buttonY + buttonHeight / 2,
        `${String.fromCharCode(65 + index)}. ${option}`,
        {
          fontSize: '20px',
          color: '#ffffff',
        }
      ).setOrigin(0.5);

      // Hover effect
      button.on('pointerover', () => {
        button.setFillStyle(0x0088ff);
      });

      button.on('pointerout', () => {
        button.setFillStyle(0x0066cc);
      });

      // Click handler
      button.on('pointerdown', () => {
        this.handleAnswer(index, button);
      });
    });
  }

  private handleAnswer(selectedIndex: number, button: Phaser.GameObjects.Rectangle) {
    // Visual feedback
    const isCorrect = selectedIndex === this.question.correctIndex;
    button.setFillStyle(isCorrect ? 0x00ff00 : 0xff0000);

    // Wait a moment before closing
    this.time.delayedCall(500, () => {
      this.onAnswerCallback(selectedIndex);
      this.scene.stop();
    });
  }
}
