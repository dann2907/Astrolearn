Mini-Sprint 1.2a: Phaser Foundation

Goal: Technical spike lolos + game scaffolding berjalan
Blocker: Tidak ada (foundational work)
Tasks (Atomic & Sequenced)

Task 0.1: Create Game Directory Structure
apps/web/src/
├── components/game/
│   ├── GameCanvas.tsx
│   └── GameUI.tsx
├── lib/game/
│   ├── scenes/
│   │   ├── BootScene.ts
│   │   ├── PreloadScene.ts
│   │   ├── MenuScene.ts
│   │   └── GameScene.ts
│   ├── config.ts
│   └── types.ts
└── app/game/
    └── page.tsx
Acceptance Criteria:

- [x] Folder structure created
- [x] Each file has basic TypeScript skeleton

Phase 1: Technical Spike (BLOCKING CHECKPOINT)
Task 1.1: Create GameCanvas Component
File: apps/web/src/components/game/GameCanvas.tsx
typescript'use client';

import { useEffect, useRef } from 'react';
import Phaser from 'phaser';

interface GameCanvasProps {
  config: Phaser.Types.Core.GameConfig;
}

export function GameCanvas({ config }: GameCanvasProps) {
  const gameRef = useRef<Phaser.Game | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return;

    // Initialize Phaser
    gameRef.current = new Phaser.Game({
      ...config,
      parent: containerRef.current,
    });

    // Cleanup on unmount
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [config]);

  return (
    <div 
      ref={containerRef} 
      className="game-container w-full h-full"
      style={{ touchAction: 'none' }} // Prevent mobile scroll
    />
  );
}
Acceptance Criteria:

- [x] Component renders without errors
- [x] TypeScript types correct
- [x] Touch action disabled for mobile

Task 1.2: Create Basic Game Config
File: apps/web/src/lib/game/config.ts
typescriptimport Phaser from 'phaser';

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
  scene: [], // Will add scenes later
};
Acceptance Criteria:

- [x] Config exports successfully
- [x] No TypeScript errors


Task 1.3: Create Test Page
File: apps/web/src/app/game/page.tsx
typescript'use client';

import { GameCanvas } from '@/components/game/GameCanvas';
import { GAME_CONFIG } from '@/lib/game/config';

export default function GamePage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-4xl aspect-[4/3]">
        <GameCanvas config={GAME_CONFIG} />
      </div>
    </div>
  );
}
Acceptance Criteria:

- [x] Page renders black canvas
- [x] Canvas centered on screen
- [x] Responsive (maintains aspect ratio)

Task 1.4: Mount/Unmount Stability Test
File: apps/web/src/app/game/test/page.tsx
typescript'use client';

import { useState } from 'react';
import { GameCanvas } from '@/components/game/GameCanvas';
import { GAME_CONFIG } from '@/lib/game/config';

export default function GameTestPage() {
  const [mountCount, setMountCount] = useState(0);
  const [isMounted, setIsMounted] = useState(true);

  const toggleMount = () => {
    setIsMounted(!isMounted);
    if (isMounted) setMountCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="mb-4 space-x-4">
        <button 
          onClick={toggleMount}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {isMounted ? 'Unmount' : 'Mount'} Game
        </button>
        <span className="text-white">
          Mount Count: {mountCount}
        </span>
      </div>
      
      {isMounted && (
        <div className="w-full max-w-4xl aspect-[4/3] mx-auto">
          <GameCanvas config={GAME_CONFIG} />
        </div>
      )}
    </div>
  );
}
Manual Test (Required):

- [x] Click mount/unmount 10 times
- [x] Check DevTools Memory tab (no leak)
- [x] No console errors
- [x] Canvas clears properly each time

Task 1.5: FPS Counter Scene (Spike Validation)
File: apps/web/src/lib/game/scenes/FPSTestScene.ts
typescriptimport Phaser from 'phaser';

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
Update config.ts:
typescriptimport { FPSTestScene } from './scenes/FPSTestScene';

export const GAME_CONFIG: Phaser.Types.Core.GameConfig = {
  // ... existing config
  scene: [FPSTestScene],
};
Manual Test (Required):

- [x] FPS stays above 55 fps consistently
- [x] Sprites bounce smoothly
- [x] No frame drops after 30 seconds

Task 1.6: Mobile Touch Test
File: apps/web/src/lib/game/scenes/TouchTestScene.ts
typescriptimport Phaser from 'phaser';

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
Manual Test (Mobile Required):

- [x] Tap creates green circles
- [x] No page scroll when tapping
- [x] No double-tap zoom
- [x] Coordinates accurate

🚦 CHECKPOINT 1: Spike Must Pass
Validation Criteria:

- [x] All 6 tasks above completed
- [x] Mount/unmount test: 10x no errors
- [x] FPS test: >55 fps stable
- [x] Touch test: works on mobile (if applicable)
- [x] Document results in docs/spike-phaser-next.md

If FAILED: Stop sprint, escalate to PM for alternative approach (iframe/Web Worker)
