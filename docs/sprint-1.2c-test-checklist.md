# Sprint 1.2c Testing Checklist

## Arena Kuis Cepat

### Functionality
- [x] "Mulai Kuis" starts game
- [x] Timer counts down from 60s
- [x] Questions cycle on answer
- [x] Score increases on correct (+100)
- [x] Score decreases on wrong (-25)
- [x] Combo multiplier works (3+ streak)
- [x] Quiz ends at 0 seconds
- [x] Quiz ends at last question
- [x] Results display correctly

### UI/UX
- [x] Progress bar updates
- [x] Combo indicator shows current streak
- [x] Timer turns red <10s (optional)
- [x] Button hover effects work
- [x] Responsive on mobile
- [x] Loading state shows while fetching

### API Integration
- [x] Questions fetch successfully
- [x] Result submits to API
- [x] XP displays after submission
- [x] Mock API works
- [x] Real API works (when ready)

## Leaderboard

### Functionality
- [ ] Global tab shows all-time top scores
- [ ] Weekly tab shows this week's top scores
- [x] Tab switching refetches data
- [ ] Data displays correctly

### UI/UX
- [ x] Top 3 highlighted with colors
- [x] Table formatted nicely
- [x] Loading state shows
- [x] Empty state shows if no data
- [ ] Responsive on mobile

### Navigation
- [x] Link from results works
- [x] Link from homepage works
- [x] Back to arena works

## Integration Tests
- [x] Complete quiz → see result → view leaderboard (full flow)
- [x] Retry quiz works multiple times
- [x] Switching between pages preserves state
