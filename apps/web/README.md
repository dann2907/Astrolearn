# Astrolearn Web App

Frontend built with Next.js 15.

## Arena & Leaderboard

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
