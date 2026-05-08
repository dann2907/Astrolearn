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

## Next Steps (Sprint 1.2b)
- [ ] Add enemies/asteroids
- [ ] Integrate question overlay
- [ ] Implement power-ups
- [ ] Connect to backend API
