import Link from 'next/link'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Rocket } from 'lucide-react'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>
}) {
  const { message } = await searchParams;

  const signIn = async (formData: FormData) => {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/')
  }

  const signUp = async (formData: FormData) => {
    'use server'

    const origin = (await headers()).get('origin')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const username = formData.get('username') as string
    const supabase = await createClient()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
        data: {
          username: username,
        },
      },
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/login?message=Check email to continue sign in process')
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto min-h-screen bg-slate-950 text-slate-200">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm border border-slate-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{' '}
        Back
      </Link>

      <div className="flex flex-col items-center gap-2 mb-8">
        <Rocket className="w-12 h-12 text-violet-400" />
        <h1 className="text-3xl font-black text-white tracking-tighter">ASTROLEARN</h1>
        <p className="text-slate-400 text-sm">Masuk ke Akademi Kosmik</p>
      </div>

      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-4 text-foreground">
        <label className="text-sm font-bold text-slate-300" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-xl px-4 py-3 bg-slate-900 border border-slate-800 focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all text-sm"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-sm font-bold text-slate-300" htmlFor="username">
          Username (untuk Pendaftaran)
        </label>
        <input
          className="rounded-xl px-4 py-3 bg-slate-900 border border-slate-800 focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all text-sm"
          name="username"
          placeholder="kadet_angkasa"
        />
        <label className="text-sm font-bold text-slate-300" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-xl px-4 py-3 bg-slate-900 border border-slate-800 focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all text-sm"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <button
          formAction={signIn}
          className="bg-violet-600 hover:bg-violet-500 rounded-xl px-4 py-3 text-white font-bold text-sm transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] mt-2"
        >
          Masuk
        </button>
        <button
          formAction={signUp}
          className="border border-slate-800 hover:bg-slate-900 rounded-xl px-4 py-3 text-slate-300 font-bold text-sm transition-all"
        >
          Daftar Baru
        </button>
        {message && (
          <p className="mt-4 p-4 bg-slate-900 border border-violet-500/30 text-violet-300 text-center rounded-xl text-sm font-medium">
            {message}
          </p>
        )}
      </form>
    </div>
  )
}
