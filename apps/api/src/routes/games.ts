import { Hono } from 'hono'
import { supabaseAdmin } from '../lib/supabase'
import { awardXP } from '../services/rpg'
import { User } from '@supabase/supabase-js'

type Variables = {
  user: User
}

const games = new Hono<{ Variables: Variables }>()

interface ShooterResult {
  score: number
  duration: number
  answers: Array<{
    questionId: string
    selectedIndex: number
    correct: boolean
    timestamp: number
  }>
}

games.post('/shooter/result', async (c) => {
  const user = c.get('user')
  const body = await c.req.json() as ShooterResult
  const { score, duration, answers } = body

  let flagged = false
  let flagReason = ''

  // 1. Duration Check
  if (duration < 10 || duration > 3600) {
    return c.json({ error: 'Invalid duration' }, 400)
  }

  // 2. Score Sanity Check (Max 20 points/sec)
  const maxPossibleScore = duration * 20
  if (score > maxPossibleScore) {
    flagged = true
    flagReason = 'Score exceeds maximum possible'
  }

  // 3. Answer Count Check (Max 1 answer per 30sec + 1)
  const maxPossibleAnswers = Math.floor(duration / 30) + 1
  if (answers.length > maxPossibleAnswers) {
    flagged = true
    flagReason = flagReason ? `${flagReason}, Excess answers` : 'Excess answers'
  }

  // 4. Timestamp Check
  for (const ans of answers) {
    if (ans.timestamp > duration * 1000 || ans.timestamp < 0) {
      flagged = true
      flagReason = flagReason ? `${flagReason}, Invalid timestamp` : 'Invalid timestamp'
      break
    }
  }

  // Calculate Rewards (only if not flagged)
  let xpAwarded = 0
  let stardustAwarded = 0

  if (!flagged) {
    // Basic formula: XP = score / 50, Stardust = score / 100
    xpAwarded = Math.floor(score / 50)
    stardustAwarded = Math.floor(score / 100)
  }

  // Save to DB
  const { error } = await supabaseAdmin
    .from('game_results')
    .insert({
      user_id: user.id,
      score,
      duration,
      answers,
      xp_awarded: xpAwarded,
      stardust_awarded: stardustAwarded,
      flagged,
      flag_reason: flagReason || null
    })

  if (error) return c.json({ error: error.message }, 500)

  // Award XP if valid
  let levelUpInfo = null
  if (!flagged && xpAwarded > 0) {
    levelUpInfo = await awardXP(user.id, xpAwarded, 'Shooter Game')
    
    // Also award Stardust in profile
    await supabaseAdmin.rpc('increment_stardust', { 
      user_id: user.id, 
      amount: stardustAwarded 
    })
  }

  return c.json({
    xp: xpAwarded,
    stardust: stardustAwarded,
    flagged,
    reason: flagReason || undefined,
    levelUpInfo
  })
})

export default games
