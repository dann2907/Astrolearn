import { supabaseAdmin } from '../lib/supabase'

export interface LevelUpResult {
  leveledUp: boolean
  oldLevel: number
  newLevel: number
  newRank: string
}

export const getRank = (level: number): string => {
  if (level >= 10) return 'Laksamana Galaksi'
  if (level >= 7) return 'Kapten Bintang'
  if (level >= 4) return 'Navigator'
  return 'Kadet'
}

export const getXPThreshold = (level: number): number => {
  // Simple formula: 300, 600, 1000, 1500, etc.
  if (level === 1) return 300
  if (level === 2) return 600
  return level * 500 // Generic
}

export async function awardXP(userId: string, amount: number, source: string): Promise<LevelUpResult> {
  // 1. Fetch current profile
  const { data: profile, error: fetchError } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (fetchError || !profile) throw new Error('Profile not found')

  let newXP = (profile.xp || 0) + amount
  let currentLevel = profile.level || 1
  let leveledUp = false

  // 2. Check for level up
  let threshold = getXPThreshold(currentLevel)
  while (newXP >= threshold) {
    newXP -= threshold
    currentLevel++
    leveledUp = true
    threshold = getXPThreshold(currentLevel)
  }

  // 3. Update profile
  const { error: updateError } = await supabaseAdmin
    .from('profiles')
    .update({
      xp: newXP,
      level: currentLevel,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)

  if (updateError) throw updateError

  return {
    leveledUp,
    oldLevel: profile.level,
    newLevel: currentLevel,
    newRank: getRank(currentLevel)
  }
}
