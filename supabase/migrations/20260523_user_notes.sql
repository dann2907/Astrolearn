-- User Notes Table for AK-03
CREATE TABLE user_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subchapter_id TEXT NOT NULL, -- can be slug or ID
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_user_notes_user ON user_notes(user_id);
CREATE INDEX idx_user_notes_subchapter ON user_notes(subchapter_id);

-- RLS
ALTER TABLE user_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notes." 
  ON user_notes FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notes." 
  ON user_notes FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own notes." 
  ON user_notes FOR DELETE 
  USING (auth.uid() = user_id);
