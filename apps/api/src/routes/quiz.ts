import { Hono } from 'hono'
import { supabase, supabaseAdmin } from '../lib/supabase'
import { awardXP } from '../services/rpg'
import { User } from '@supabase/supabase-js'

type Variables = {
  user: User
}

const quiz = new Hono<{ Variables: Variables }>()

// GET /api/quiz/questions?subChapterId=xxx
quiz.get('/questions', async (c) => {
  const subChapterId = c.req.query('subChapterId')
  if (!subChapterId) return c.json({ error: 'subChapterId is required' }, 400)

  const { data, error } = await supabase
    .from('questions')
    .select('id, question, options, explanation') // exclude correct_index
    .eq('subchapter_id', subChapterId)
    .limit(5)

  if (error) return c.json({ error: error.message }, 500)
  
  return c.json(data)
})

// POST /api/quiz/quiz-results
quiz.post('/quiz-results', async (c) => {
  const user = c.get('user')
  const body = await c.req.json()
  const { subchapterId, answers } = body

  if (!subchapterId || !answers || !Array.isArray(answers)) {
    return c.json({ error: 'Invalid payload' }, 400)
  }

  const { data: questions, error: fetchError } = await supabaseAdmin
    .from('questions')
    .select('id, correct_index')
    .eq('subchapter_id', subchapterId)

  if (fetchError || !questions) return c.json({ error: 'Subchapter questions not found' }, 404)

  let correctCount = 0
  const totalQuestions = questions.length
  
  answers.forEach((ans: any) => {
    const q = questions.find(item => item.id === ans.questionId)
    if (q && q.correct_index === ans.selectedOption) {
      correctCount++
    }
  })

  const score = Math.round((correctCount / totalQuestions) * 100)
  const passed = score >= 60

  const { error: resultError } = await supabaseAdmin
    .from('quiz_results')
    .insert({
      user_id: user.id,
      subchapter_id: subchapterId,
      score,
      passed
    })

  if (resultError) return c.json({ error: resultError.message }, 500)

  let levelUpInfo = null
  if (passed) {
    const xpReward = 100
    levelUpInfo = await awardXP(user.id, xpReward, `Quiz: ${subchapterId}`)
  }

  return c.json({
    score,
    passed,
    correctCount,
    totalQuestions,
    levelUpInfo
  })
})

export default quiz
