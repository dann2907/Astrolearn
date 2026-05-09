import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import MainLayout from '@/components/layout/MainLayout'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  // Fetch profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const userData = {
    id: user.id,
    name: profile?.username || user.email?.split('@')[0] || 'Navigator',
    rank: profile?.level ? getRank(profile.level) : 'Kadet',
    level: profile?.level || 1,
    xp: profile?.xp || 0,
    nextLevelXp: (profile?.level || 1) * 1000,
    stardust: profile?.stardust || 0,
    badges: profile?.badges || ["Pioneer Astrolearn"],
  }

  return (
    <MainLayout userData={userData}>
      {children}
    </MainLayout>
  )
}

function getRank(level: number) {
  if (level >= 20) return 'Admiral'
  if (level >= 15) return 'Commander'
  if (level >= 10) return 'Captain'
  if (level >= 5) return 'Navigator'
  return 'Kadet'
}
