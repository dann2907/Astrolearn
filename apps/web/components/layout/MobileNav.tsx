'use client'

import React from 'react'
import { Rocket, BookOpen, BrainCircuit, Zap, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MobileNav() {
  const pathname = usePathname()

  const navItems = [
    { id: 'dashboard', icon: Rocket, label: 'Home', href: '/dashboard' },
    { id: 'academy', icon: BookOpen, label: 'Akademi', href: '/academy' },
    { id: 'quiz', icon: BrainCircuit, label: 'Kuis', href: '/arena' },
    { id: 'game', icon: Zap, label: 'Shooter', href: '/explorer' },
    { id: 'profile', icon: User, label: 'Profil', href: '/profile' },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-slate-950/80 backdrop-blur-xl border-t border-slate-800/50 z-50 flex items-center justify-around px-2">
      {navItems.map(item => (
        <Link 
          key={item.id}
          href={item.href}
          className={`flex flex-col items-center gap-1 min-w-[64px] transition-colors ${
            pathname === item.href ? 'text-violet-400' : 'text-slate-500'
          }`}
        >
          <item.icon className="w-5 h-5" />
          <span className="text-[9px] font-bold uppercase tracking-wide">{item.label}</span>
        </Link>
      ))}
    </nav>
  )
}
