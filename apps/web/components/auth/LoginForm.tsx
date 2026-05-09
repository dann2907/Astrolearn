'use client'

import React, { useState } from 'react'
import { Rocket, Loader2 } from 'lucide-react'
import { signIn, signUp } from '@/lib/auth-actions'
import { toast } from 'sonner'

interface LoginFormProps {
  onSuccess?: () => void
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [loading, setLoading] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, action: 'signin' | 'signup') => {
    e.preventDefault()
    setLoading(action)
    setMessage(null)

    const formData = new FormData(e.currentTarget)
    
    try {
      const result = action === 'signin' ? await signIn(formData) : await signUp(formData)
      
      if (result && 'error' in result) {
        setMessage(result.error as string)
        toast.error(result.error as string)
      } else if (result && 'message' in result) {
        setMessage(result.message as string)
        toast.success(result.message as string)
      } else {
        // Successful sign in redirects, but if it doesn't (like in some edge cases)
        onSuccess?.()
      }
    } catch (err) {
      console.error(err)
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <Rocket className="w-10 h-10 text-violet-400" />
        <h1 className="text-2xl font-black text-white tracking-tighter uppercase">Akademi Kosmik</h1>
        <p className="text-slate-400 text-xs font-medium tracking-wide uppercase">Otorisasi Kadet</p>
      </div>

      <form className="flex flex-col gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1" htmlFor="email">
            Email Identity
          </label>
          <input
            className="w-full rounded-xl px-4 py-3 bg-slate-900 border border-slate-800 focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all text-sm text-white placeholder:text-slate-600 shadow-inner"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="kadet@astrolearn.com"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1" htmlFor="username-input">
            Codename (Signup only)
          </label >
          <input
            className="w-full rounded-xl px-4 py-3 bg-slate-900 border border-slate-800 focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all text-sm text-white placeholder:text-slate-600 shadow-inner"
            id="username-input"
            name="username"
            placeholder="kadet_angkasa"
            autoComplete="username"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1" htmlFor="password">
            Access Key
          </label >
          <input
            className="w-full rounded-xl px-4 py-3 bg-slate-900 border border-slate-800 focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all text-sm text-white placeholder:text-slate-600 shadow-inner"
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="••••••••"
            required
          />
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <button
            onClick={(e) => {
              const form = (e.target as HTMLButtonElement).form;
              if (form) {
                const event = new Event('submit', { cancelable: true, bubbles: true });
                Object.defineProperty(event, 'currentTarget', { value: form });
                handleSubmit({ ...event, preventDefault: () => {}, currentTarget: form } as any, 'signin');
              }
            }}
            disabled={!!loading}
            type="button"
            className="bg-violet-600 hover:bg-violet-500 disabled:opacity-50 rounded-xl px-4 py-3 text-white font-black text-xs uppercase tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] flex items-center justify-center gap-2"
          >
            {loading === 'signin' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Masuk Sesi'}
          </button>
          
          <button
            onClick={(e) => {
              const form = (e.target as HTMLButtonElement).form;
              if (form) {
                const event = new Event('submit', { cancelable: true, bubbles: true });
                Object.defineProperty(event, 'currentTarget', { value: form });
                handleSubmit({ ...event, preventDefault: () => {}, currentTarget: form } as any, 'signup');
              }
            }}
            disabled={!!loading}
            type="button"
            className="border border-slate-800 hover:bg-slate-900 disabled:opacity-50 rounded-xl px-4 py-3 text-slate-400 font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
          >
            {loading === 'signup' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Daftar Baru'}
          </button>
        </div>

        {message && (
          <div className="mt-4 p-4 bg-slate-900/50 border border-violet-500/30 text-violet-300 text-center rounded-xl text-xs font-bold tracking-tight animate-in fade-in zoom-in duration-300">
            {message}
          </div>
        )}
      </form>
    </div>
  )
}
