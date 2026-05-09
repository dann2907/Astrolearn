-- Game Results Table
CREATE TABLE game_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  duration INTEGER NOT NULL, -- seconds
  answers JSONB NOT NULL,
  xp_awarded INTEGER NOT NULL,
  stardust_awarded INTEGER NOT NULL,
  flagged BOOLEAN DEFAULT FALSE,
  flag_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_game_results_user ON game_results(user_id);
CREATE INDEX idx_game_results_flagged ON game_results(flagged) WHERE flagged = true;

-- RLS
ALTER TABLE game_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own game results." ON game_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own game results." ON game_results FOR INSERT WITH CHECK (auth.uid() = user_id);
