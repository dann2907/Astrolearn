-- Stardust Increment Function
CREATE OR REPLACE FUNCTION increment_stardust(user_id UUID, amount INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles
  SET stardust = COALESCE(stardust, 0) + amount,
      updated_at = NOW()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
