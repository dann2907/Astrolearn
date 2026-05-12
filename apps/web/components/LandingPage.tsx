'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { 
  Globe, Gamepad2, FileQuestion, Trophy, 
  ArrowRight, Sparkles, LogIn, Rocket, Menu
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

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
              <h2 className="text-xl md:text-2xl font-black text-orange-400 animate-pulse uppercase tracking-[0.3em] mb-4">Misi Rahasia Dimulai!</h2>
              <div className="relative inline-block">
                <h1 className="text-6xl md:text-[100px] font-black tracking-tighter mb-6 relative z-10 leading-none">
                  <span className="text-white">ASTRO</span><span className="text-yellow-400 drop-shadow-[0_0_30px_rgba(250,204,21,0.6)]">LEARN</span>
                </h1>
                <div className="absolute -bottom-2 left-0 w-full h-3 bg-orange-500 rounded-full blur-[2px]"></div>
              </div>
              
              <p className="text-lg md:text-2xl text-blue-200 max-w-xl mx-auto mb-10 font-black leading-relaxed drop-shadow-lg">
                Jadilah Pahlawan Antariksa! Jelajahi bintang, main game seru, dan menangkan hadiah keren!
              </p>

              <button 
                onClick={openLogin}
                className="bg-linear-to-r from-orange-500 via-yellow-400 to-orange-500 hover:scale-110 text-blue-900 font-black text-xl uppercase tracking-widest py-6 px-16 rounded-full shadow-[0_0_50px_rgba(249,115,22,0.6)] transition-all transform active:scale-95 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Rocket className="w-6 h-6 animate-bounce" /> AYO TERBANG!
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
              </button>
            </div>
          </div>

          {/* Cards Section (Quick Preview) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20 z-20 px-4">
            {[
              { id: 'materi', title: 'Planet Ajaib', icon: <Globe />, color: 'from-blue-400 to-indigo-600', desc: 'Lihat planet-planet yang sangat keren!', shadow: 'shadow-blue-500/40' },
              { id: 'game', title: 'Main Seru', icon: <Gamepad2 />, color: 'from-purple-400 to-pink-600', desc: 'Tembak asteroid & selamatkan bumi!', shadow: 'shadow-purple-500/40' },
              { id: 'kuis', title: 'Kuis Pintar', icon: <FileQuestion />, color: 'from-emerald-400 to-teal-600', desc: 'Jawab teka-teki & jadi yang terbaik!', shadow: 'shadow-emerald-500/40' },
              { id: 'proses&badge', title: 'Hadiah Keren', icon: <Trophy />, color: 'from-orange-400 to-red-600', desc: 'Kumpulkan badge bintang & level up!', shadow: 'shadow-orange-500/40' }
            ].map((card) => (
              <button 
                key={card.id} 
                onClick={() => setActiveTab(card.id as LandingTab)}
                className={`bg-linear-to-br ${card.color} p-8 rounded-[2.5rem] text-left hover:scale-105 transition-all shadow-xl ${card.shadow} group relative overflow-hidden border-2 border-white/20`}
              >
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform shadow-inner">
                  {React.cloneElement(card.icon as React.ReactElement<{ className?: string }>, { className: 'w-8 h-8 text-white' })}
                </div>
                <h4 className="text-xl font-black text-white mb-2 tracking-tight">{card.title}</h4>
                <p className="text-xs text-white/80 font-bold leading-relaxed">{card.desc}</p>
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
            key={`star-${i}`}
            className="absolute rounded-full bg-white opacity-40 animate-pulse"            style={{
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

      <div className="relative z-10 max-w-300 mx-auto px-6 pb-12 flex flex-col min-h-screen">
        <nav className="flex items-center justify-between py-6">
          <div onClick={() => setActiveTab('beranda')} className="flex items-center gap-3 cursor-pointer group">
            <div className="relative w-12 h-12 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 flex items-center justify-center">
              <Image 
                src="/logo.png" 
                alt="AstroLearn Logo" 
                width={48}
                height={48}
                priority
                className="object-contain drop-shadow-[0_0_8px_rgba(251,146,60,0.6)]"
              />
            </div>
            <div>
              <h1 className="text-2xl font-black leading-tight tracking-tighter">
                <span className="text-white">ASTRO</span><span className="text-orange-400">LEARN</span>
              </h1>
              <p className="text-[10px] text-orange-400/70 font-bold uppercase tracking-widest">Penjelajah Antariksa Cilik</p>
            </div>
          </div>

          {/* Desktop Nav */}
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
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-t-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
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

          {/* Mobile Nav (Burger) */}
          <div className="md:hidden flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#0A0B1A] border-slate-900 flex flex-col p-0">
                <SheetHeader className="p-6 border-b border-slate-900/50">
                  <SheetTitle className="text-left">
                    <div className="flex items-center gap-2 text-violet-400">
                      <Rocket className="w-8 h-8 fill-current text-orange-400" />
                      <span className="font-black text-2xl tracking-tighter text-white">ASTROLEARN</span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                
                <div className="flex-1 p-6 flex flex-col gap-2">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Navigasi</p>
                  {menus.map((menu) => (
                    <SheetClose asChild key={menu.id}>
                      <button 
                        onClick={() => setActiveTab(menu.id)}
                        className={`flex items-center gap-3 w-full px-4 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${
                          activeTab === menu.id 
                            ? 'bg-blue-600/10 text-white border border-blue-500/20' 
                            : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                        }`}
                      >
                        {menu.label}
                      </button>
                    </SheetClose>
                  ))}
                </div>

                <div className="p-6 border-t border-slate-900/50 mt-auto">
                  <SheetClose asChild>
                    <button 
                      onClick={openLogin}
                      className="flex items-center justify-center gap-3 w-full bg-linear-to-r from-orange-500 to-yellow-500 text-blue-900 px-6 py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-orange-500/20 active:scale-95 transition-transform"
                    >
                      <LogIn className="w-5 h-5" />
                      Masuk Sekarang
                    </button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
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
