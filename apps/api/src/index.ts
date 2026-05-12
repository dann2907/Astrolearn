import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { authMiddleware } from './middleware/auth'
import chapters from './routes/chapters'
import quiz from './routes/quiz'
import users from './routes/users'
import games from './routes/games'
import notes from './routes/notes'
import recommendations from './routes/recommendations'
import { User } from '@supabase/supabase-js'

type Variables = {
  user: User
}

const app = new Hono<{ Variables: Variables }>().basePath('/api')

app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    service: 'astrolearn-api'
  })
})

// Middleware
app.use('*', cors({
  origin: ['https://astrolearn.vercel.app',
            'http://localhost:3000'
  ],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}))

// Public routes
app.get('/', (c) => c.text('Astrolearn API is running!'))

// Protected routes
app.use('/chapters/*', authMiddleware)
app.use('/quiz/*', authMiddleware)
app.use('/users/*', authMiddleware)
app.use('/games/*', authMiddleware)
app.use('/notes/*', authMiddleware)
app.use('/recommendations/*', authMiddleware)

// Mount routes
app.route('/chapters', chapters)
app.route('/quiz', quiz)
app.route('/users', users)
app.route('/games', games)
app.route('/notes', notes)
app.route('/recommendations', recommendations)

const port = 3001
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
