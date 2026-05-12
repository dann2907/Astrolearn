import { Hono } from 'hono'
import { supabase } from '../lib/supabase'
import { User } from '@supabase/supabase-js'

type Variables = {
  user: User
}

const notes = new Hono<{ Variables: Variables }>()

// POST /api/notes - Save a note
notes.post('/', async (c) => {
  const user = c.get('user')
  const body = await c.req.json()
  const { subchapter_id, content } = body

  if (!subchapter_id || !content) {
    return c.json({ error: 'Missing subchapter_id or content' }, 400)
  }

  const { data, error } = await supabase
    .from('user_notes')
    .insert({
      user_id: user.id,
      subchapter_id,
      content
    })
    .select()
    .single()

  if (error) return c.json({ error: error.message }, 500)
  return c.json(data, 201)
})

// GET /api/notes - Fetch notes
notes.get('/', async (c) => {
  const user = c.get('user')
  const subchapterId = c.req.query('subchapter_id')

  let query = supabase
    .from('user_notes')
    .select('*')
    .eq('user_id', user.id)

  if (subchapterId) {
    query = query.eq('subchapter_id', subchapterId)
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) return c.json({ error: error.message }, 500)
  return c.json(data)
})

// DELETE /api/notes/:id - Delete a note
notes.delete('/:id', async (c) => {
  const user = c.get('user')
  const id = c.req.param('id')

  const { error } = await supabase
    .from('user_notes')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return c.json({ error: error.message }, 500)
  return c.json({ message: 'Note deleted' })
})

export default notes
