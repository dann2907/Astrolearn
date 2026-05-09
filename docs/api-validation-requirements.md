# Game Result API Validation Requirements

## Endpoint: POST /api/games/shooter/result

### Input Schema
```typescript
{
  score: number;
  duration: number; // seconds
  answers: Array<{
    questionId: string;
    selectedIndex: number;
    correct: boolean;
    timestamp: number;
  }>;
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
