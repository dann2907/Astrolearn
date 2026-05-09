import Phaser from 'phaser';
import { fetchRandomQuestion, submitGameResult } from '@/lib/api/game';
import type { Question, QuestionAnswer, GameResult } from '@/lib/game/types';

export class GameScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Rectangle;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: any;
  private bullets!: Phaser.Physics.Arcade.Group;
  private lastFired = 0;
  private fireRate = 250; // ms
  private scoreText!: Phaser.GameObjects.Text;
  private score = 0;

  // HP System
  private hp = 5;
  private hpIcons: Phaser.GameObjects.Rectangle[] = [];

  // Question integration
  private questionTimer = 0;
  private questionInterval = 30000; // 30 seconds
  private gameStartTime = 0;
  private answers: QuestionAnswer[] = [];
  private isPaused = false;
  private nextQuestionText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    this.score = 0;
    this.hp = 5;
    this.answers = [];
    this.questionTimer = 0;
    this.isPaused = false;
    this.gameStartTime = Date.now();
    
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

    this.nextQuestionText = this.add.text(
      400,
      16,
      'Soal berikutnya: 30s',
      {
        fontSize: '20px',
        color: '#ffff00',
      }
    ).setOrigin(0.5, 0);

    // HP hearts at top-left
    this.hpIcons = [];
    for (let i = 0; i < this.hp; i++) {
      const heart = this.add.rectangle(
        30 + i * 40,
        50,
        30,
        30,
        0xff0066
      );
      this.hpIcons.push(heart);
    }

    if (process.env.NODE_ENV === 'development') {
      const debugDamage = this.add.text(600, 560, 'Damage', {
        fontSize: '16px',
        color: '#ffaa00',
        backgroundColor: '#000000',
        padding: { x: 10, y: 5 },
      }).setInteractive();

      debugDamage.on('pointerdown', () => {
        this.takeDamage(1);
      });

      const debugGameOver = this.add.text(700, 560, 'End Game', {
        fontSize: '16px',
        color: '#ff0000',
        backgroundColor: '#000000',
        padding: { x: 10, y: 5 },
      }).setInteractive();

      debugGameOver.on('pointerdown', () => {
        this.gameOver();
      });
    }
  }

  private takeDamage(amount: number) {
    this.hp -= amount;
    
    if (this.hp < 0) this.hp = 0;
    
    // Update UI
    this.hpIcons.forEach((icon, index) => {
      icon.setVisible(index < this.hp);
    });

    if (this.hp <= 0) {
      this.gameOver();
    }
  }

  private async gameOver() {
    this.physics.pause();
    this.isPaused = true;

    const duration = (Date.now() - this.gameStartTime) / 1000;

    const gameResult: GameResult = {
      score: this.score,
      duration,
      answers: this.answers,
    };

    // Submit to backend
    try {
      const reward = await submitGameResult(gameResult);
      
      this.scene.start('GameOverScene', {
        result: gameResult,
        reward,
      });
    } catch (error) {
      console.error('Failed to submit game result:', error);
      
      // Show game over anyway without rewards
      this.scene.start('GameOverScene', {
        result: gameResult,
      });
    }
  }

  update(time: number, delta: number) {
    if (!this.isPaused) {
      this.handleMovement();
      this.handleShooting(time);
      this.cleanupBullets();

      // Question timer logic
      this.questionTimer += delta;
      
      const secondsUntilQuestion = Math.ceil(
        (this.questionInterval - this.questionTimer) / 1000
      );
      this.nextQuestionText.setText(`Soal berikutnya: ${Math.max(0, secondsUntilQuestion)}s`);

      if (this.questionTimer >= this.questionInterval) {
        this.pauseForQuestion();
        this.questionTimer = 0;
      }
    }
  }

  private async pauseForQuestion() {
    this.isPaused = true;
    this.physics.pause();
    this.nextQuestionText.setVisible(false);

    // Show loading indicator
    const loadingText = this.add.text(400, 300, 'Memuat soal...', {
      fontSize: '24px',
      color: '#ffffff',
    }).setOrigin(0.5);

    try {
      const question = await fetchRandomQuestion(['tata-surya', 'bintang']);
      loadingText.destroy();
      
      this.scene.pause('GameScene');
      this.scene.launch('QuestionOverlayScene', {
        question,
        onAnswer: (selectedIndex: number) => {
          this.handleQuestionAnswer(question, selectedIndex);
        },
      });
      this.scene.bringToTop('QuestionOverlayScene');
    } catch (error) {
      console.error('Failed to fetch question:', error);
      loadingText.setText('Gagal memuat soal. Melanjutkan...');
      this.time.delayedCall(1000, () => {
        loadingText.destroy();
        this.resumeGame();
      });
    }
  }

  private handleQuestionAnswer(question: Question, selectedIndex: number) {
    const isCorrect = selectedIndex === question.correctIndex;
    
    // Record answer
    this.answers.push({
      questionId: question.id,
      selectedIndex,
      correct: isCorrect,
      timestamp: Date.now() - this.gameStartTime,
    });

    // TODO: Apply power-up or debuff
    if (isCorrect) {
      this.score += 100;
      this.scoreText.setText(`Skor: ${this.score}`);
      console.log('Correct! Applying power-up...');
    } else {
      console.log('Wrong! Applying debuff...');
    }

    this.resumeGame();
  }

  private resumeGame() {
    this.scene.resume('GameScene');
    this.scene.pause('QuestionOverlayScene');
    this.physics.resume();
    this.isPaused = false;
    this.nextQuestionText.setVisible(true);
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
