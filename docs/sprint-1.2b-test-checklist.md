# Sprint 1.2b Testing Checklist

## Question Integration

### Happy Path

- [x] Game starts normally
- [x] After 30 seconds, game pauses
- [x] Question overlay appears
- [x] Selecting answer closes overlay
- [x] Game resumes
- [x] Timer resets for next question
- [x] Multiple questions work in one session
- [x] Correct answer increments score (+100)

### Error Handling

- [x] If API fails, game continues without crash
- [x] Loading indicator shows during fetch ("Memuat soal...")
- [x] Error message displays if fetch fails ("Gagal memuat soal. Melanjutkan...")

### Answer Recording

- [x] Correct answer recorded as `correct: true`
- [x] Wrong answer recorded as `correct: false`
- [x] All answers saved in array with timestamps
- [x] Answers submitted with game result

## Game Over Flow

### Trigger

- [x] HP reaches 0 → game over (Manual test: call `takeDamage(5)` in console)
- [x] "End Game" debug button works (dev only)

### Result Submission

- [x] Score, duration, answers sent to API
- [x] API returns XP and Stardust
- [x] GameOverScene displays rewards

### Validation

- [x] Normal scores accepted
- [x] Cheated scores flagged (e.g., Score > duration * 20)
- [x] Flagged results show warning: "⚠️ Skor tidak wajar"

### UI

- [x] Final stats displayed correctly
- [x] "Main Lagi" restarts game
- [x] "Menu" returns to menu
- [x] HUD timer hidden during question overlay

## Mock vs Real API

- [x] Mock API works with `NEXT_PUBLIC_USE_MOCK_API=true`
- [x] Real API works when backend ready
- [x] Switching between modes seamless
