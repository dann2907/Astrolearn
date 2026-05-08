import { Hono } from 'hono'
import { supabase } from '../lib/supabase'
import { getRank } from '../services/rpg'
import { User } from '@supabase/supabase-js'

type Variables = {
  user: User
}

const users = new Hono<{ Variables: Variables }>()

// GET /api/users/me
users.get('/me', async (c) => {
  const user = c.get('user')
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) return c.json({ error: error.message }, 500)

  return c.json({
    ...profile,
    rank: getRank(profile.level || 1)
  })
})

// GET /api/progress
users.get('/progress', async (c) => {
  const user = c.get('user')
  const { data: progress, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id)

  if (error) return c.json({ error: error.message }, 500)

  // Calculate overall progress percentage (simplified)
  const completedCount = progress.filter(p => p.status === 'completed').length
  const totalSubchapters = 10 // Placeholder total
  const progressPercentage = Math.round((completedCount / totalSubchapters) * 100)

  return c.json({
    progress,
    progressPercentage,
    lastChapterId: progress[progress.length - 1]?.chapter_id || 'tata-surya',
    lastSubchapterId: progress[progress.length - 1]?.module_id || 'sc-matahari'
  })
})

export default users
