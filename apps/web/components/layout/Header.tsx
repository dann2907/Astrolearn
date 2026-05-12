'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star, Play, Menu, Rocket, LogOut, User, Trophy, Network, Archive, BookOpen, Zap } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from '@/lib/auth-actions'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

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

const MobileNavLink = ({ item, pathname }: { item: any; pathname: string }) => {
  const isActive = pathname === item.href
  return (
    <Link 
      href={item.href}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all ${
        isActive 
          ? 'bg-violet-600/10 text-white border border-violet-500/20' 
          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/50'
      }`}
    >
      <item.icon className={`w-5 h-5 ${isActive ? 'text-violet-400' : 'text-slate-500'}`} />
      <span>{item.label}</span>
    </Link>
  )
}

export default function Header({ userData }: Readonly<HeaderProps>) {
  const levelProgress = Math.round((userData.xp / userData.nextLevelXp) * 100)
  const pathname = usePathname()

  const mainNav = [
    { id: 'dashboard', icon: Rocket, label: 'Dashboard', href: '/dashboard' },
    { id: 'academy', icon: BookOpen, label: 'Akademi', href: '/academy' },
    { id: 'quiz', icon: Zap, label: 'Arena Kuis', href: '/arena' },
    { id: 'game', icon: Zap, label: 'Shooter', href: '/explorer' },
  ]
  
  const socialNav = [
    { id: 'leaderboard', icon: Trophy, label: 'Leaderboard', href: '/leaderboard' },
    { id: 'skilltree', icon: Network, label: 'Skill Tree', href: '/skills' },
    { id: 'collection', icon: Archive, label: 'Koleksi', href: '/collection' },
  ]

  return (
    <header className="bg-slate-950/50 backdrop-blur-md sticky top-0 z-30 border-b border-slate-900/50">
      <div className="w-full max-w-480 mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between gap-4">
        {/* Left side: Welcome (Desktop) / Logo (Mobile) */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-slate-950 border-slate-900 p-0 flex flex-col w-70">
                <SheetHeader className="p-6 border-b border-slate-900">
                  <SheetTitle className="text-left">
                    <Link href="/dashboard" className="flex items-center gap-2 text-violet-400">
                      <Rocket className="w-8 h-8 fill-current" />
                      <span className="font-black text-2xl tracking-tighter text-white">ASTROLEARN</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                  {/* User Profile in Menu */}
                  <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-800/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-linear-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center border-2 border-slate-800">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">{userData.name}</p>
                        <p className="text-[10px] text-violet-400 font-bold uppercase tracking-wider">{userData.rank}</p>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-slate-400">Level {userData.level}</span>
                        <span className="text-violet-400">{levelProgress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-linear-to-r from-violet-500 to-fuchsia-500" style={{ width: `${levelProgress}%` }} />
                      </div>
                      <div className="flex items-center gap-1 mt-2">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span className="text-[10px] font-bold text-amber-500">{userData.stardust.toLocaleString()} Stardust</span>
                      </div>
                    </div>
                  </div>

                  {/* Nav Links */}
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-2">Menu Utama</p>
                    {mainNav.map(item => <MobileNavLink key={item.id} item={item} pathname={pathname} />)}
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-2">Sosial & Progres</p>
                    {socialNav.map(item => <MobileNavLink key={item.id} item={item} pathname={pathname} />)}
                  </div>
                </div>

                <div className="p-4 border-t border-slate-900 mt-auto">
                  <form action={signOut}>
                    <button type="submit" className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-all">
                      <LogOut className="w-5 h-5" />
                      <span>Keluar Sesi</span>
                    </button>
                  </form>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-sm md:text-xl font-bold text-white tracking-tight truncate">
              <span className="hidden sm:inline">Selamat datang, </span>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-fuchsia-400">{userData.rank} {userData.name}!</span>
            </h2>
            <p className="text-[10px] md:text-xs text-slate-400 font-medium mt-0.5">Level {userData.level} &bull; {levelProgress}% Progress</p>
          </div>
        </div>

        {/* Right side: Stats (Desktop) */}
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden sm:flex items-center gap-3 bg-slate-900/40 px-3 py-1.5 rounded-full border border-slate-800/50">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span className="text-xs font-bold text-amber-500">{userData.stardust.toLocaleString()}</span>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <div className="flex flex-col items-end gap-1.5 min-w-45">
              <div className="flex justify-between w-full text-[10px] font-bold uppercase tracking-wider">
                <span className="text-violet-400">{userData.xp} XP</span>
                <span className="text-slate-500">{userData.nextLevelXp} XP</span>
              </div>
              <div className="w-full h-1.5 bg-slate-900 rounded-full border border-slate-800/50 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${levelProgress}%` }}
                  className="h-full bg-linear-to-r from-violet-500 to-fuchsia-500 rounded-full relative"
                >
                  <div className="absolute inset-0 bg-white/20 mix-blend-overlay animate-pulse" />
                </motion.div>
              </div>
            </div>

            <Link 
              href="/academy"
              className="bg-violet-600 hover:bg-violet-500 text-white px-5 py-2 rounded-xl font-bold text-sm shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all hover:scale-105 active:scale-95 flex items-center gap-2 whitespace-nowrap"
            >
              <Play className="w-4 h-4 fill-current" />
              Lanjutkan
            </Link>
          </div>
          
          {/* Mobile CTA */}
          <Link 
            href="/academy"
            className="lg:hidden bg-violet-600 hover:bg-violet-500 text-white p-2 rounded-lg shadow-lg"
          >
            <Play className="w-5 h-5 fill-current" />
          </Link>
        </div>
      </div>
    </header>
  )
}
