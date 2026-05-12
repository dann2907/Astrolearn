'use client'

import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

interface MainLayoutProps {
  children: React.ReactNode
  userData: {
    id: string
    name: string
    rank: string
    level: number
    xp: number
    nextLevelXp: number
    stardust: number
    badges: string[]
  }
}

export default function MainLayout({ children, userData }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-violet-500/30 overflow-x-hidden">
      <div className="flex">
        <Sidebar userData={userData} />
        
        <div className="flex-1 flex flex-col min-w-0">
          <Header userData={userData} />
          
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          100% { background-position: -250% -250%; }
        }
      `}</style>
    </div>
  )
}
