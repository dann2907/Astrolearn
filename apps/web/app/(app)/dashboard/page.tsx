import { createClient } from '@/utils/supabase/server'
import QuickStats from '@/components/dashboard/QuickStats'
import MainQuestCard from '@/components/dashboard/MainQuestCard'
import LearningPathMap from '@/components/dashboard/LearningPathMap'
import DailyQuests from '@/components/dashboard/DailyQuests'
import Link from 'next/link'
import { Zap, Trophy } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  // Fetch progress
  const { data: progress } = await supabase
    .from('user_progress')
    .select('module_id')
    .eq('user_id', user.id)
    .eq('status', 'completed')

  const completedModuleIds = progress?.map((p) => p.module_id) || []

  const quests = [
    { id: '1', task: "Baca 2 sub-bab tentang Lubang Hitam", reward: "50 XP", progress: "1/2", done: false },
    { id: '2', task: "Mulai petualangan di Akademi", reward: "100 XP", progress: completedModuleIds.length > 0 ? "1/1" : "0/1", done: completedModuleIds.length > 0 },
    { id: '3', task: "Jawab 10 soal di Arena Kuis", reward: "30 XP", progress: "0/10", done: false },
  ]

  return (
    <div className="p-4 md:p-8 lg:p-12 space-y-10 max-w-7xl mx-auto w-full">
      {/* Arena & Leaderboard Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Link
          href="/arena"
          className="group block p-8 bg-gradient-to-br from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 rounded-3xl text-white text-center transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
          <h3 className="text-3xl font-black mb-2 flex items-center justify-center gap-2">
            <Zap className="w-8 h-8 fill-yellow-400 text-yellow-400" /> ARENA KUIS
          </h3>
          <p className="text-cyan-100 font-medium">Uji pengetahuan astronomimu dalam 60 detik!</p>
        </Link>

        <Link
          href="/leaderboard"
          className="group block p-8 bg-gradient-to-br from-amber-600 to-orange-700 hover:from-amber-500 hover:to-orange-600 rounded-3xl text-white text-center transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
          <h3 className="text-3xl font-black mb-2 flex items-center justify-center gap-2">
            <Trophy className="w-8 h-8 fill-yellow-300 text-yellow-300" /> LEADERBOARD
          </h3>
          <p className="text-amber-100 font-medium">Lihat siapa penjelajah antariksa terbaik!</p>
        </Link>
      </div>

      <QuickStats />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        <div className="xl:col-span-8 space-y-10">
          <MainQuestCard completedModuleIds={completedModuleIds} />
          <LearningPathMap completedModuleIds={completedModuleIds} />
        </div>

        <div className="xl:col-span-4 h-full">
          <DailyQuests initialQuests={quests} />
        </div>
      </div>
    </div>
  )
}
