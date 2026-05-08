import { getModuleBySlug } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Rocket, ArrowLeft, Star, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import QuizWidget from '@/components/academy/QuizWidget'

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const { metadata, content } = await getModuleBySlug(slug)
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  // Fetch subchapter ID based on slug
  const { data: sub } = await supabase
    .from('subchapters')
    .select('id')
    .eq('slug', slug)
    .single()

  // Check if already completed
  const { data: progress } = await supabase
    .from('user_progress')
    .select('status')
    .eq('user_id', user.id)
    .eq('module_id', sub?.id || '')
    .single()

  const isCompleted = progress?.status === 'completed'

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans pb-20">
      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-md sticky top-0 z-30 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/academy" className="flex items-center gap-2 text-slate-400 hover:text-white transition">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-bold">Kembali ke Akademi</span>
          </Link>
          <div className="flex items-center gap-2 text-violet-400">
            <Rocket className="w-5 h-5" />
            <span className="font-black tracking-tighter">ASTROLEARN</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-2 text-amber-500 mb-2">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-xs font-black uppercase tracking-widest">{metadata.xp_reward} XP REWARD</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-4">{metadata.title}</h1>
          <p className="text-slate-400 text-lg">{metadata.description}</p>
        </div>

        <div className="prose prose-invert prose-violet max-w-none 
          prose-h1:text-3xl prose-h1:font-black prose-h1:tracking-tight
          prose-h2:text-2xl prose-h2:font-bold prose-h2:tracking-tight prose-h2:mt-8
          prose-p:text-slate-300 prose-p:leading-relaxed
          prose-li:text-slate-300
          prose-blockquote:border-violet-500 prose-blockquote:bg-violet-500/10 prose-blockquote:p-4 prose-blockquote:rounded-r-xl
          prose-strong:text-white prose-strong:font-bold
        ">
          <MDXRemote source={content} />
        </div>

        <div className="mt-16 pt-10 border-t border-slate-800">
          {sub?.id && (
            <div className="space-y-10">
               <div className={`p-6 rounded-2xl text-center border ${
                 isCompleted ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-violet-600/10 border-violet-500/20'
               }`}>
                  <p className={`${isCompleted ? 'text-emerald-400' : 'text-violet-300'} font-bold`}>
                    {isCompleted ? 'Kamu sudah menyelesaikan misi ini!' : 'Selesaikan materi di atas untuk membuka Kuis Mini!'}
                  </p>
               </div>
               <QuizWidget subchapterId={sub.id} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
