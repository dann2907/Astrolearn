'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function completeModule(moduleId: string, xpReward: number) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // 1. Mark module as completed
  const { error: progressError } = await supabase
    .from('user_progress')
    .upsert({
      user_id: user.id,
      module_id: moduleId,
      status: 'completed',
      completed_at: new Date().toISOString(),
    })

  if (progressError) throw progressError

  // 2. Add XP to user profile
  // In a real app, we should use a database function or transaction to increment XP
  // For now, we fetch current and update
  const { data: profile, error: profileFetchError } = await supabase
    .from('profiles')
    .select('xp')
    .eq('id', user.id)
    .single()

  if (profileFetchError) throw profileFetchError

  const { error: xpUpdateError } = await supabase
    .from('profiles')
    .update({ xp: (profile?.xp || 0) + xpReward })
    .eq('id', user.id)

  if (xpUpdateError) throw xpUpdateError

  revalidatePath('/')
  revalidatePath(`/academy/${moduleId}`)
}
