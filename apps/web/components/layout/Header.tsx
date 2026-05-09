'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star, Play } from 'lucide-react'
import Link from 'next/link'

interface HeaderProps {
  userData: {
    name: string
    rank: string
    level: number
    xp: number
    nextLevelXp: number
    stardust: number
  }
}

export default function Header({ userData }: HeaderProps) {
  const levelProgress = Math.round((userData.xp / userData.nextLevelXp) * 100)

  return (
    <header className="bg-slate-950/50 backdrop-blur-md sticky top-0 z-30 border-b border-slate-900/50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">
            Selamat datang, <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">{userData.rank} {userData.name}!</span>
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">Level {userData.level} &bull; {levelProgress}% menuju level berikutnya</p>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <div className="flex flex-col items-end gap-1.5 min-w-[200px]">
            <div className="flex justify-between w-full text-[10px] font-bold uppercase tracking-wider">
              <span className="text-violet-400">{userData.xp} XP</span>
              <span className="text-slate-500">{userData.nextLevelXp} XP</span>
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-full border border-slate-800 p-0.5 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${levelProgress}%` }}
                className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full relative"
              >
                <div className="absolute inset-0 bg-white/20 mix-blend-overlay animate-pulse" />
              </motion.div>
            </div>
            <div className="flex items-center gap-1.5 self-end">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span className="text-xs font-bold text-amber-500">{userData.stardust.toLocaleString()} Stardust</span>
            </div>
          </div>

          <Link 
            href="/academy"
            className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            Lanjutkan Belajar
          </Link>
        </div>
      </div>
    </header>
  )
}
