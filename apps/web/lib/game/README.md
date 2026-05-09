# Eskadron Penjelajah - Game Module

## Architecture

### Scene Flow
BootScene → PreloadScene → MenuScene → GameScene
↑           |
└───────────┘

### File Structure
lib/game/
├── scenes/
│   ├── BootScene.ts       # Initial config
│   ├── PreloadScene.ts    # Asset loading
│   ├── MenuScene.ts       # Main menu
│   └── GameScene.ts       # Gameplay
├── config.ts              # Phaser configuration
└── types.ts               # TypeScript types

## Controls

**Desktop:**
- Movement: Arrow keys or WASD
- Shoot: Spacebar

**Mobile:**
- Movement: Touch and drag
- Shoot: Auto-fire (WIP)

## Development

### Running Locally
```bash
pnpm --filter web dev
# Visit http://localhost:3000/explorer
```

### Adding New Scenes
1. Create scene file in `scenes/`
2. Export from scene file
3. Add to `config.ts` scene array

### Performance Guidelines
- Keep sprites < 100 at a time
- Use object pooling for bullets
- Destroy offscreen objects

## Question Integration (Sprint 1.2b)

### Flow
1. Every 30 seconds, game pauses
2. API call to `GET /api/questions/random`
3. `QuestionOverlayScene` displays question
4. User selects answer
5. Game resumes (Score updated, power-up/debuff applied)
6. Repeat until game over (HP = 0 or Manual End)

### API Endpoints Used

**Fetch Question:**
`GET /api/questions/random?count=1&topics=tata-surya,bintang`

**Submit Result:**
`POST /api/games/shooter/result`
Body: `{ score, duration, answers }`

### Mock API
Set `NEXT_PUBLIC_USE_MOCK_API=true` in `.env.local` to use mock data during development.

### Testing Game Over Flow
In development, click "End Game" button (bottom-right) to trigger game over immediately.
