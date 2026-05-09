'use client'

import React, { useState } from 'react'
import { 
  Globe, Gamepad2, FileQuestion, Trophy, 
  ArrowRight, Sparkles, LogIn
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import LoginModal from './auth/LoginModal'
import { useLandingStore, LandingTab } from '@/store/use-landing-store'
import { 
  MateriPreview, 
  GamePreview, 
  QuizPreview, 
  ProgressPreview 
} from './landing/Previews'

export default function LandingPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const { activeTab, setActiveTab } = useLandingStore()
  const [mounted, setMounted] = useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const menus: { label: string; id: LandingTab }[] = [
    { label: 'Beranda', id: 'beranda' },
    { label: 'Materi', id: 'materi' },
    { label: 'Game', id: 'game' },
    { label: 'Kuis', id: 'kuis' },
    { label: 'Proses & Badge', id: 'proses&badge' }
  ]

  const openLogin = () => setIsLoginModalOpen(true)

  const renderContent = () => {
    switch (activeTab) {
      case 'materi': return <MateriPreview onCTA={openLogin} />
      case 'game': return <GamePreview onCTA={openLogin} />
      case 'kuis': return <QuizPreview onCTA={openLogin} />
      case 'proses&badge': return <ProgressPreview onCTA={openLogin} />
      default: return (
        <>
          {/* Hero Section */}
          <div className="flex-1 flex flex-col items-center justify-center text-center mt-10 relative">
            {/* Elemen Dekorasi Mengambang */}
            <div className="absolute left-0 bottom-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] animate-bounce hidden xl:block" style={{ animationDuration: '4s' }}>
              <span className="text-[140px]" role="img" aria-label="Astronaut">🧑‍🚀</span>
              <div className="absolute -bottom-8 -left-10 w-64 h-24 bg-indigo-900/40 rounded-[100%] blur-xl -z-10"></div>
            </div>
            
            <div className="absolute right-10 top-10 drop-shadow-[0_0_40px_rgba(255,165,0,0.3)] animate-pulse hidden xl:block" style={{ animationDuration: '3s' }}>
              <span className="text-[120px] inline-block transform rotate-45" role="img" aria-label="Rocket">🚀</span>
            </div>

            <div className="absolute left-[15%] top-0 opacity-40 drop-shadow-xl hidden lg:block">
              <span className="text-[60px]" role="img" aria-label="Blue Planet">🪐</span>
            </div>
            
            <div className="absolute right-[25%] bottom-20 opacity-30 drop-shadow-xl hidden lg:block">
              <span className="text-[40px] transform -rotate-12" role="img" aria-label="Small Planet">🌍</span>
            </div>

            <div className="absolute top-0 right-[40%] text-blue-200/20">
               <Sparkles className="w-8 h-8" />
            </div>

            {/* Teks Hero */}
            <div className="relative z-20 space-y-2">
              <h2 className="text-xl md:text-2xl font-black text-blue-400 uppercase tracking-[0.3em] mb-4">Selamat Datang di</h2>
              <div className="relative inline-block">
                <h1 className="text-6xl md:text-[100px] font-black tracking-tighter mb-6 relative z-10 leading-none">
                  <span className="text-white">ASTRO</span><span className="text-[#FACC15] drop-shadow-[0_0_30px_rgba(250,204,21,0.3)]">LEARN</span>
                </h1>
                <div className="absolute -bottom-2 left-0 w-full h-3 bg-blue-600 rounded-full blur-[2px]"></div>
              </div>
              
              <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto mb-10 font-bold leading-relaxed">
                Belajar Tata Surya jadi lebih seru, interaktif, dan menyenangkan!
              </p>

              <button 
                onClick={openLogin}
                className="bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 text-white font-black text-lg uppercase tracking-widest py-5 px-12 rounded-full shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all transform hover:scale-105 active:scale-95 group"
              >
                Mulai Petualangan!
              </button>
            </div>
          </div>

          {/* Cards Section (Quick Preview) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20 z-20">
            {[
              { id: 'materi', title: 'Materi', icon: <Globe />, color: 'blue', desc: 'Eksplorasi tata surya.' },
              { id: 'game', title: 'Game', icon: <Gamepad2 />, color: 'purple', desc: 'Tantangan seru shooter.' },
              { id: 'kuis', title: 'Kuis', icon: <FileQuestion />, color: 'green', desc: 'Uji pemahamanmu.' },
              { id: 'proses&badge', title: 'Badge', icon: <Trophy />, color: 'orange', desc: 'Lihat progresmu.' }
            ].map((card) => (
              <button 
                key={card.id} 
                onClick={() => setActiveTab(card.id as LandingTab)}
                className="bg-slate-900/50 border border-slate-800 p-6 rounded-[2rem] text-left hover:border-slate-700 transition-all hover:-translate-y-2 group"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {React.cloneElement(card.icon as React.ReactElement, { className: 'w-6 h-6 text-white' })}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{card.title}</h4>
                <p className="text-xs text-slate-500 font-medium">{card.desc}</p>
              </button>
            ))}
          </div>
        </>
      )
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0B1A] text-white font-sans overflow-hidden relative selection:bg-blue-500/30">
      {/* Background Bintang & Efek */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {mounted && [...Array(50)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-white opacity-40 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 pb-12 flex flex-col min-h-screen">
        <nav className="flex items-center justify-between py-6">
          <div onClick={() => setActiveTab('beranda')} className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <Globe className="w-10 h-10 text-orange-400 group-hover:rotate-12 transition-transform duration-500" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-4 border-2 border-blue-400 rounded-full -rotate-12"></div>
            </div>
            <div>
              <h1 className="text-2xl font-black leading-tight tracking-tighter">
                <span className="text-white">ASTRO</span><span className="text-orange-400">LEARN</span>
              </h1>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Penjelajah Tata Surya</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-10">
            <div className="flex gap-8 text-[11px] font-black uppercase tracking-widest">
              {menus.map((menu) => (
                <button 
                  key={menu.id}
                  onClick={() => setActiveTab(menu.id)}
                  className={`relative pb-1 hover:text-white transition-colors ${
                    activeTab === menu.id ? 'text-white' : 'text-gray-500'
                  }`}
                >
                  {menu.label}
                  {activeTab === menu.id && (
                    <motion.span 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 rounded-t-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    />
                  )}
                </button>
              ))}
            </div>

            <button 
              onClick={openLogin}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl"
            >
              <LogIn className="w-4 h-4 text-violet-400" />
              Masuk / Daftar
            </button>
          </div>
        </nav>

        <main className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  )
}
