Phase 3: Polish & Testing
Task 3.1: Add Sound Effects (Optional)
File: apps/web/src/components/quiz/QuizGame.tsx (update)
typescript// Add at top of component
const correctSound = useRef<HTMLAudioElement | null>(null);
const wrongSound = useRef<HTMLAudioElement | null>(null);

useEffect(() => {
  correctSound.current = new Audio('/sounds/correct.mp3');
  wrongSound.current = new Audio('/sounds/wrong.mp3');
}, []);

// In handleAnswer
if (isCorrect) {
  correctSound.current?.play();
} else {
  wrongSound.current?.play();
}
Assets needed:

/public/sounds/correct.mp3
/public/sounds/wrong.mp3

Acceptance Criteria:

 Sounds play on answer (if files exist)
 No errors if files missing
 Volume reasonable


Task 3.2: Create Test Checklist
File: docs/sprint-1.2c-test-checklist.md
markdown# Sprint 1.2c Testing Checklist

## Arena Kuis Cepat

### Functionality
- [ ] "Mulai Kuis" starts game
- [ ] Timer counts down from 60s
- [ ] Questions cycle on answer
- [ ] Score increases on correct (+100)
- [ ] Score decreases on wrong (-25)
- [ ] Combo multiplier works (3+ streak)
- [ ] Quiz ends at 0 seconds
- [ ] Quiz ends at last question
- [ ] Results display correctly

### UI/UX
- [ ] Progress bar updates
- [ ] Combo indicator shows current streak
- [ ] Timer turns red <10s (optional)
- [ ] Button hover effects work
- [ ] Responsive on mobile
- [ ] Loading state shows while fetching

### API Integration
- [ ] Questions fetch successfully
- [ ] Result submits to API
- [ ] XP displays after submission
- [ ] Mock API works
- [ ] Real API works (when ready)

## Leaderboard

### Functionality
- [ ] Global tab shows all-time top scores
- [ ] Weekly tab shows this week's top scores
- [ ] Tab switching refetches data
- [ ] Data displays correctly

### UI/UX
- [ ] Top 3 highlighted with colors
- [ ] Table formatted nicely
- [ ] Loading state shows
- [ ] Empty state shows if no data
- [ ] Responsive on mobile

### Navigation
- [ ] Link from results works
- [ ] Link from homepage works
- [ ] Back to arena works

## Integration Tests
- [ ] Complete quiz → see result → view leaderboard (full flow)
- [ ] Retry quiz works multiple times
- [ ] Switching between pages preserves state
Acceptance Criteria:

 All items testable
 Covers happy path and edge cases


Task 3.3: Update Documentation
File: apps/web/README.md (append)
markdown## Arena & Leaderboard

### Arena Kuis Cepat
- Location: `/arena`
- 60-second rapid-fire quiz
- Scoring: +100 correct, -25 wrong, combo bonuses
- Rewards: XP based on final score

### Leaderboard
- Location: `/leaderboard`
- Two views: Global (all-time) and Weekly
- Top 10 players displayed
- Updates on each quiz completion

### API Endpoints

**Quiz Questions:**
GET /api/questions/random?count=20

**Submit Quiz:**
POST /api/quiz-results
Body: { score, correctCount, wrongCount, comboMax, answers, duration }

**Leaderboard:**
GET /api/leaderboard?scope=global|weekly

### Environment Variables
NEXT_PUBLIC_USE_MOCK_API=true  # Use mock data
NEXT_PUBLIC_API_URL=http://localhost:3001

Acceptance Criteria:

 Documentation clear
 API endpoints listed
 Environment setup documented


🎯 Mini-Sprint 1.2c Definition of Done
Code Quality

 All 13 tasks completed
 No TypeScript errors
 No console warnings
 Code follows conventions

Functionality

 Arena quiz works end-to-end
 Timer accurate
 Scoring correct
 Leaderboard displays data
 Tab switching works

API Integration

 Mock API fully functional
 Real API integration ready
 Error handling for API failures

Documentation

 Test checklist complete
 README updated
 API endpoints documented

Testing

 Manual test checklist 100% pass
 Tested with mock data
 Responsive on mobile checked

Deployment

 Code merged to sprint-1.2c branch
 Deployed to staging
 PM notified


📦 Deliverables Checklist

 Arena page functional at /arena
 Leaderboard page functional at /leaderboard
 Navigation links on homepage
 Test checklist for QA
 Documentation updated