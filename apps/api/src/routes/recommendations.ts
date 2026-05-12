import { Hono } from 'hono'
import { supabase } from '../lib/supabase'
import { User } from '@supabase/supabase-js'

type Variables = {
  user: User
}

const recommendations = new Hono<{ Variables: Variables }>()

// GET /api/recommendations/review
recommendations.get('/review', async (c) => {
  const user = c.get('user')

  // Fetch quiz results for this user
  const { data: results, error } = await supabase
    .from('quiz_results')
    .select('subchapter_id, score, passed')
    .eq('user_id', user.id)

  if (error) return c.json({ error: error.message }, 500)
  if (!results || results.length === 0) {
    return c.json({ message: 'Belum ada data kuis. Ayo mulai belajar! 🚀' })
  }

  // Calculate error rate per subchapter
  // Simple logic: average score < 50
  const stats: Record<string, { total: number, sum: number }> = {}
  results.forEach(res => {
    if (!stats[res.subchapter_id]) {
      stats[res.subchapter_id] = { total: 0, sum: 0 }
    }
    stats[res.subchapter_id].total += 1
    stats[res.subchapter_id].sum += res.score
  })

  const lowPerformers = Object.entries(stats)
    .map(([id, data]) => ({
      subchapter_id: id,
      avgScore: data.sum / data.total
    }))
    .filter(item => item.avgScore < 60)
    .sort((a, b) => a.avgScore - b.avgScore) // lowest score first

  if (lowPerformers.length === 0) {
    return c.json({ message: 'Kamu sudah menguasai semua topik minggu ini! Mantap! 🌟' })
  }

  // Get subchapter details for the top recommendation
  const topRec = lowPerformers[0]
  const { data: sub, error: subError } = await supabase
    .from('subchapters')
    .select('title, slug')
    .eq('id', topRec.subchapter_id)
    .single()

  if (subError) return c.json({ error: subError.message }, 500)

  return c.json({
    subchapter_id: topRec.subchapter_id,
    title: sub.title,
    slug: sub.slug,
    avgScore: topRec.avgScore,
    message: `Topik ${sub.title} perlu kamu ulang. Siap tingkatkan akurasi? 🚀`
  })
})

export default recommendations
