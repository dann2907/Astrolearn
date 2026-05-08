import { Hono } from 'hono'
import { supabase } from '../lib/supabase'

const chapters = new Hono()

// GET /api/chapters
chapters.get('/', async (c) => {
  const { data, error } = await supabase
    .from('chapters')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) return c.json({ error: error.message }, 500)
  return c.json(data)
})

// GET /api/chapters/:id/subchapters
chapters.get('/:id/subchapters', async (c) => {
  const chapterId = c.req.param('id')
  const { data, error } = await supabase
    .from('subchapters')
    .select('*')
    .eq('chapter_id', chapterId)
    .order('sort_order', { ascending: true })

  if (error) return c.json({ error: error.message }, 500)
  return c.json(data)
})

export default chapters
