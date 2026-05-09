'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Rocket, BookOpen, Trophy, Zap, User, Network, Archive, LogOut 
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from '@/lib/auth-actions'

interface SidebarProps {
  userData: {
    name: string
    rank: string
    level: number
    xp: number
    nextLevelXp: number
  }
}

export default function Sidebar({ userData }: SidebarProps) {
  const pathname = usePathname()
  
  const levelProgress = Math.round((userData.xp / userData.nextLevelXp) * 100)

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

  const NavBtn = ({ item }: { item: any }) => {
    const isActive = pathname === item.href || (item.id === 'dashboard' && pathname === '/dashboard')
    
    return (
      <Link 
        href={item.href}
        className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
          isActive 
            ? 'bg-violet-600/10 text-white' 
            : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/50'
        }`}
      >
        {isActive && (
          <motion.div layoutId="nav-pill" className="absolute left-0 w-1 h-5 bg-violet-500 rounded-r-full" />
        )}
        <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${
          isActive ? 'text-violet-400' : 'text-slate-500 group-hover:text-slate-300'
        }`} />
        <span className={isActive ? 'font-bold' : ''}>{item.label}</span>
      </Link>
    )
  }

  return (
    <aside className="hidden md:flex flex-col w-[240px] bg-slate-950 border-r border-slate-800/50 h-screen sticky top-0 overflow-y-auto z-40">
      <div className="p-6 h-full flex flex-col">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 text-violet-400 mb-8">
          <Rocket className="w-8 h-8 fill-current" />
          <span className="font-black text-2xl tracking-tighter text-white">ASTROLEARN</span>
        </Link>

        {/* Mini Profile */}
        <Link href="/profile" className="block bg-slate-900/50 rounded-xl p-3 border border-slate-800/50 mb-8 cursor-pointer hover:bg-slate-900 transition group">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center border-2 border-slate-800 group-hover:border-violet-400 transition shadow-lg">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{userData.name}</p>
              <p className="text-[10px] text-violet-400 font-bold uppercase tracking-wider">{userData.rank}</p>
            </div>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${levelProgress}%` }}
              className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
            />
          </div>
        </Link>

        {/* Nav Groups */}
        <div className="space-y-6">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 ml-2">Utama</p>
            <div className="space-y-1">
              {mainNav.map(item => (
                <NavBtn key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-900">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 ml-2">Progres & Sosial</p>
            <div className="space-y-1">
              {socialNav.map(item => (
                <NavBtn key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-auto pt-8">
           <form action={signOut}>
             <button type="submit" className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-all">
                <LogOut className="w-5 h-5" />
                <span>Keluar Sesi</span>
             </button>
           </form>
        </div>
      </div>
    </aside>
  )
}
