import { Context, Next } from 'hono'
import { createClient, User } from '@supabase/supabase-js'

type Variables = {
  user: User
}

export const authMiddleware = async (c: Context<{ Variables: Variables }>, next: Next) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized: Missing token' }, 401)
  }

  const token = authHeader.split(' ')[1]
  
  // We need a fresh client for each request to set the session/token
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      global: { headers: { Authorization: authHeader } }
    }
  )

  const { data: { user }, error } = await supabase.auth.getUser(token)

  if (error || !user) {
    return c.json({ error: 'Unauthorized: Invalid token' }, 401)
  }

  // Set user in context
  c.set('user', user)
  await next()
}
