# SPRINT1.2b

## Phase 1: Question Overlay UI

Task 1.1: Create QuestionOverlay Scene
File: apps/web/src/lib/game/scenes/QuestionOverlayScene.ts
typescriptimport Phaser from 'phaser';
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
    const questionText = this.add.text(
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

      const label = this.add.text(
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
Acceptance Criteria:

- [x] Overlay appears above game
- [x] Question text displays correctly
- [x] 4 answer buttons visible
- [x] Click triggers callback
- [x] Visual feedback for correct/wrong


Task 1.2: Integrate Overlay into GameScene
File: apps/web/src/lib/game/scenes/GameScene.ts (update)
Add properties:
typescriptprivate questionTimer = 0;
private questionInterval = 30000; // 30 seconds
private gameStartTime = 0;
private answers: QuestionAnswer[] = [];
private isPaused = false;
Add in create():
typescriptthis.gameStartTime = Date.now();
this.scene.launch('QuestionOverlayScene'); // Preload scene
this.scene.pause('QuestionOverlayScene');
Add in update():
typescriptif (!this.isPaused) {
  this.questionTimer += delta;
  
  if (this.questionTimer >= this.questionInterval) {
    this.pauseForQuestion();
    this.questionTimer = 0;
  }
}
Add methods:
typescriptprivate async pauseForQuestion() {
  this.isPaused = true;
  this.physics.pause();

  try {
    const question = await fetchRandomQuestion(['tata-surya', 'bintang']);
    
    this.scene.pause('GameScene');
    this.scene.resume('QuestionOverlayScene');
    this.scene.bringToTop('QuestionOverlayScene');
    
    this.scene.get('QuestionOverlayScene').scene.restart({
      question,
      onAnswer: (selectedIndex: number) => {
        this.handleQuestionAnswer(question, selectedIndex);
      },
    });
  } catch (error) {
    console.error('Failed to fetch question:', error);
    this.resumeGame(); // Continue game even if question fails
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
}
Acceptance Criteria:

- [x] Game pauses every 30 seconds
- [x] Question overlay appears
- [x] Selecting answer resumes game
- [x] Answers recorded in array
- [x] Console logs confirm correct/wrong

Task 1.3: Add Question Countdown Timer to HUD
File: apps/web/src/lib/game/scenes/GameScene.ts (update)
Add in setupUI():
typescriptthis.nextQuestionText = this.add.text(
  400,
  16,
  'Soal berikutnya: 30s',
  {
    fontSize: '20px',
    color: '#ffff00',
  }
).setOrigin(0.5, 0);
Add in update() (when not paused):
typescriptconst secondsUntilQuestion = Math.ceil(
  (this.questionInterval - this.questionTimer) / 1000
);
this.nextQuestionText.setText(`Soal berikutnya: ${secondsUntilQuestion}s`);
Acceptance Criteria:

- [x] Countdown displays at top center
- [x] Updates every second
- [x] Resets after each question
- [x] Hidden during question overlay

## Phase 2 Game End & Result Submission

Task 2.1: Add HP System
File: apps/web/src/lib/game/scenes/GameScene.ts (update)
Add properties:
typescriptprivate hp = 5;
private hpIcons: Phaser.GameObjects.Rectangle[] = [];
Add in setupUI():
typescript// HP hearts at top-left
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
Add method:
typescriptprivate takeDamage(amount: number) {
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
Acceptance Criteria:

- [x] 5 hearts display top-left
- [x] Hearts disappear when HP lost
- [x] Game over triggers at 0 HP

Task 2.2: Create GameOverScene
File: apps/web/src/lib/game/scenes/GameOverScene.ts
typescriptimport Phaser from 'phaser';
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
Acceptance Criteria:

- [x] Displays final score
- [x] Shows duration and correct answers
- [x] Shows XP and Stardust earned
- [x] "Main Lagi" restarts GameScene
- [x] "Menu" returns to MenuScene
- [x] Warning shown if flagged

Task 2.3: Integrate Game Over Flow in GameScene
File: apps/web/src/lib/game/scenes/GameScene.ts (update)
typescriptprivate async gameOver() {
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
Acceptance Criteria:

- [ ] Game stops when HP = 0 # no enemies yet
- [x] Result submitted to API (or mock)
- [x] GameOverScene launches with data
- [x] Handles API errors gracefully

Task 2.4: Add Manual Game Over Button (Testing)
File: apps/web/src/lib/game/scenes/GameScene.ts (update)
Add in setupUI():
typescriptif (process.env.NODE_ENV === 'development') {
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
Acceptance Criteria:

- [x] Button only visible in development
- [x] Triggers game over immediately
- [x] Useful for testing end flow

## Phase 3: Server Validation (Backend Task)

Note: If backend team (Team 1) is not ready, skip this and use mock. Document what needs to be implemented.
Task 3.1: Document API Validation Requirements
File: docs/api-validation-requirements.md
markdown# Game Result API Validation Requirements

## Endpoint: POST /api/games/shooter/result

### Input Schema

```typescript
{
  score: number;
  duration: number; // seconds
  answers: Array;
}
```

### Validation Rules

#### 1. Score Sanity Check

maxPossibleScore = duration * 20 (assumption: 20 points/sec max)
if (score > maxPossibleScore) → flag as suspicious

#### 2. Answer Count Check

maxPossibleAnswers = floor(duration / 30) + 1
if (answers.length > maxPossibleAnswers) → flag as suspicious

#### 3. Duration Check

if (duration < 10) → reject (too short)
if (duration > 3600) → reject (too long, 1 hour)

#### 4. Answer Timestamp Check

for each answer:
if (answer.timestamp > duration * 1000) → flag
if (answer.timestamp < 0) → flag

### Response

**Valid Result:**
```json
{
  "xp": 250,
  "stardust": 125,
  "flagged": false
}
```

**Flagged Result:**
```json
{
  "xp": 0,
  "stardust": 0,
  "flagged": true,
  "reason": "Score exceeds maximum possible"
}
```

### Database Schema

Table: `game_results`
```sql
CREATE TABLE game_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  score INTEGER NOT NULL,
  duration INTEGER NOT NULL,
  answers JSONB NOT NULL,
  xp_awarded INTEGER NOT NULL,
  stardust_awarded INTEGER NOT NULL,
  flagged BOOLEAN DEFAULT FALSE,
  flag_reason TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_game_results_user ON game_results(user_id);
CREATE INDEX idx_game_results_flagged ON game_results(flagged) WHERE flagged = true;
```
Acceptance Criteria:

- [] Document complete and clear
- [] Validation rules specific
- [] Database schema defined
- [] Shared with backend team

Task 3.2: Create Backend Validation Tests (if Team 1 available)
File: apps/api/src/routes/game.test.ts
typescriptimport { describe, it, expect } from 'vitest';
import { validateGameResult } from './game-validation';

describe('Game Result Validation', () => {
  it('should accept valid game result', () => {
    const result = {
      score: 500,
      duration: 60,
      answers: [
        { questionId: 'q1', selectedIndex: 1, correct: true, timestamp: 15000 },
        { questionId: 'q2', selectedIndex: 2, correct: false, timestamp: 45000 },
      ],
    };

    const validation = validateGameResult(result);
    expect(validation.valid).toBe(true);
    expect(validation.flagged).toBe(false);
  });

  it('should flag impossibly high score', () => {
    const result = {
      score: 10000, // Too high for 60 seconds
      duration: 60,
      answers: [],
    };

    const validation = validateGameResult(result);
    expect(validation.flagged).toBe(true);
    expect(validation.reason).toContain('Score exceeds maximum');
  });

  it('should flag too many answers', () => {
    const result = {
      score: 500,
      duration: 60, // Only 2-3 questions possible
      answers: Array(10).fill({
        questionId: 'q1',
        selectedIndex: 0,
        correct: true,
        timestamp: 30000,
      }),
    };

    const validation = validateGameResult(result);
    expect(validation.flagged).toBe(true);
  });

  it('should reject negative duration', () => {
    const result = {
      score: 100,
      duration: -5,
      answers: [],
    };

    expect(() => validateGameResult(result)).toThrow();
  });
});
Acceptance Criteria:

- [] Tests cover main validation rules
- [] All tests pass
- [] CI runs tests automatically

## Phase 4: Polish & Documentation

Task 4.1: Add Loading State for Question Fetch
File: apps/web/src/lib/game/scenes/GameScene.ts (update)
typescriptprivate async pauseForQuestion() {
  this.isPaused = true;
  this.physics.pause();

  // Show loading indicator
  const loadingText = this.add.text(400, 300, 'Memuat soal...', {
    fontSize: '24px',
    color: '#ffffff',
  }).setOrigin(0.5);

  try {
    const question = await fetchRandomQuestion(['tata-surya', 'bintang']);
    loadingText.destroy();
    
    // ... rest of logic
  } catch (error) {
    loadingText.setText('Gagal memuat soal. Melanjutkan...');
    this.time.delayedCall(1000, () => {
      loadingText.destroy();
      this.resumeGame();
    });
  }
}
Acceptance Criteria:

 "Memuat soal..." appears during fetch
 Error message shown if fetch fails
 Game resumes after 1 second on error

Task 4.2: Update Game README
File: apps/web/src/lib/game/README.md (append)
markdown## Question Integration

### Flow

1. Every 30 seconds, game pauses
2. API call to `GET /api/questions/random`
3. QuestionOverlayScene displays question
4. User selects answer
5. Game resumes (power-up/debuff applied)
6. Repeat until game over

### API Endpoints Used

**Fetch Question:**
GET /api/questions/random?count=1&topics=tata-surya,bintang

**Submit Result:**
POST /api/games/shooter/result
Body: { score, duration, answers }

### Mock API

Set `NEXT_PUBLIC_USE_MOCK_API=true` in `.env.local` to use mock data during development.

### Testing Game Over Flow

In development, click "End Game" button (bottom-right) to trigger game over immediately.
Acceptance Criteria:

- [x] Documentation updated
- [x] API endpoints documented
- [x] Mock instructions clear

Task 4.3: Create Integration Test Checklist
File: docs/sprint-1.2b-test-checklist.md
markdown# Sprint 1.2b Testing Checklist

## Question Integration

### Happy Path

- [x] Game starts normally
- [x] After 30 seconds, game pauses
- [x] Question overlay appears
- [x] Selecting answer closes overlay
- [x] Game resumes
- [x] Timer resets for next question
- [x] Multiple questions work in one session

### Error Handling

- [ ] If API fails, game continues without crash
- [ ] Loading indicator shows during fetch
- [ ] Error message displays if fetch fails

### Answer Recording

- [x] Correct answer increments correct count
- [x] Wrong answer increments wrong count
- [x] All answers saved in array
- [x] Answers submitted with game result

## Game Over Flow

### Trigger

- [x] HP reaches 0 → game over
- [x] "End Game" debug button works (dev only)

### Result Submission

- [x] Score, duration, answers sent to API
- [x] API returns XP and Stardust
- [x] GameOverScene displays rewards

### Validation

- [x] Normal scores accepted
- [x] Cheated scores flagged
- [x] Flagged results show warning

### UI

- [x] Stats displayed correctly
- [x] "Main Lagi" restarts game
- [x] "Menu" returns to menu
- [x] Rewards animate in (optional)

## Mock vs Real API

- [ ] Mock API works with env var
- [ ] Real API works when backend ready
- [ ] Switching between modes seamless

## Performance

- [x] Game runs smoothly during questions
- [x] No FPS drops when overlay appears
- [x] No memory leaks after multiple sessions
Acceptance Criteria:

- [x] Checklist comprehensive
- [x] QA can use for manual testing
- [] All items testable
