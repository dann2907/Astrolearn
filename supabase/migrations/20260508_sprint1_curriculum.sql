-- Curriculum Hierarchy
CREATE TABLE chapters (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  sort_order INTEGER NOT NULL,
  is_locked BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE subchapters (
  id TEXT PRIMARY KEY,
  chapter_id TEXT REFERENCES chapters(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL, -- matches MDX filename
  sort_order INTEGER NOT NULL,
  xp_reward INTEGER DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quiz System
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subchapter_id TEXT REFERENCES subchapters(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options TEXT[] NOT NULL, -- Array of strings
  correct_index INTEGER NOT NULL, -- 0-based
  explanation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quiz Results (Log)
CREATE TABLE quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  subchapter_id TEXT REFERENCES subchapters(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  passed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE subchapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Chapters viewable by everyone." ON chapters FOR SELECT USING (true);
CREATE POLICY "Subchapters viewable by everyone." ON subchapters FOR SELECT USING (true);
CREATE POLICY "Questions viewable by everyone." ON questions FOR SELECT USING (true);
CREATE POLICY "Users can view own quiz results." ON quiz_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own quiz results." ON quiz_results FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Seed Initial Curriculum
INSERT INTO chapters (id, title, sort_order, is_locked) VALUES
('tata-surya', 'Bab 1: Tata Surya', 1, false),
('bintang', 'Bab 2: Bintang', 2, true),
('galaksi', 'Bab 3: Galaksi', 3, true);

INSERT INTO subchapters (id, chapter_id, title, slug, sort_order, xp_reward) VALUES
('sc-matahari', 'tata-surya', '1.1 Matahari', 'tata-surya/1.1-matahari', 1, 100),
('sc-planet', 'tata-surya', '1.2 Planet-Planet', 'tata-surya/1.2-planet', 2, 100);

-- Seed Sample Questions for 1.1 Matahari
INSERT INTO questions (subchapter_id, question, options, correct_index, explanation) VALUES
('sc-matahari', 'Apa unsur kimia terbanyak di Matahari?', ARRAY['Oksigen', 'Hidrogen', 'Helium', 'Nitrogen'], 1, 'Hidrogen menyusun sekitar 73% massa Matahari.'),
('sc-matahari', 'Lapisan terluar atmosfer Matahari disebut...', ARRAY['Fotosfer', 'Kromosfer', 'Korona', 'Inti'], 2, 'Korona adalah lapisan terluar yang terlihat saat gerhana matahari total.'),
('sc-matahari', 'Berapa perkiraan umur Matahari saat ini?', ARRAY['4.6 Miliar Tahun', '10 Miliar Tahun', '1 Miliar Tahun', '200 Juta Tahun'], 0, 'Matahari terbentuk sekitar 4.6 miliar tahun yang lalu.');
