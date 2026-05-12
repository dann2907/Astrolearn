import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { BookOpen, CheckCircle2, Play, Lock, ChevronRight, Star } from 'lucide-react'

export default async function AcademyPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Fetch chapters and subchapters
  // In Phase 3 we use API, but for RSC direct DB fetch is faster
  const { data: chapters } = await supabase
    .from('chapters')
    .select('*')
    .order('sort_order')

  const { data: subchapters } = await supabase
    .from('subchapters')
    .select('*')
    .order('sort_order')

  const { data: progress } = await supabase
    .from('user_progress')
    .select('module_id, status')
    .eq('user_id', user.id)

  const completedIds = progress?.filter(p => p.status === 'completed').map(p => p.module_id) || []

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-white tracking-tight mb-2 flex items-center gap-4">
          <div className="p-3 bg-violet-600 rounded-2xl shadow-lg shadow-violet-500/20">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          Akademi Kosmik
        </h1>
        <p className="text-slate-400">Jelajahi rahasia alam semesta melalui kurikulum terstruktur kami.</p>
      </div>

      <div className="space-y-12">
          {chapters?.map((chapter) => (
            <div key={chapter.id} className={`relative ${chapter.is_locked ? 'opacity-50' : ''}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
                  chapter.is_locked ? 'bg-slate-900 border border-slate-800 text-slate-600' : 'bg-violet-600 text-white shadow-violet-500/20'
                }`}>
                  {chapter.is_locked ? <Lock className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">{chapter.title}</h2>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    {subchapters?.filter(s => s.chapter_id === chapter.id).length} Sub-bab
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 ml-6 pl-10 border-l-2 border-slate-900 relative">
                {subchapters?.filter(s => s.chapter_id === chapter.id).map((sub) => {
                  const isDone = completedIds.includes(sub.id)
                  const canAccess = !chapter.is_locked

                  return (
                    <Link 
                      key={sub.id}
                      href={canAccess ? `/academy/${sub.slug}` : '#'}
                      className={`group flex items-center justify-between p-5 rounded-2xl border transition-all ${
                        isDone ? 'bg-emerald-500/5 border-emerald-500/20' : 
                        canAccess ? 'bg-slate-900 border-slate-800 hover:border-violet-500/50 hover:bg-slate-800' :
                        'bg-slate-950 border-slate-900 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isDone ? 'bg-emerald-500 text-white shadow-emerald-500/20' :
                          canAccess ? 'bg-slate-950 text-violet-400 border border-slate-800 group-hover:border-violet-500' :
                          'bg-slate-900 text-slate-700'
                        }`}>
                          {isDone ? <CheckCircle2 className="w-5 h-5" /> : 
                           canAccess ? <Play className="w-5 h-5 fill-current" /> :
                           <Lock className="w-4 h-4" />}
                        </div>
                        <div>
                          <h3 className={`font-bold transition-colors ${
                            isDone ? 'text-emerald-400' : 
                            canAccess ? 'text-white' : 'text-slate-600'
                          }`}>
                            {sub.title}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <Star className={`w-3 h-3 fill-current ${isDone ? 'text-emerald-500' : 'text-amber-500'}`} />
                            <span className={`text-[10px] font-black uppercase tracking-widest ${
                              isDone ? 'text-emerald-600' : 'text-slate-500'
                            }`}>
                              {sub.xp_reward} XP
                            </span>
                          </div>
                        </div>
                      </div>
                      {canAccess && !isDone && (
                        <ChevronRight className="w-5 h-5 text-slate-700 group-hover:text-violet-400 transition-transform group-hover:translate-x-1" />
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
