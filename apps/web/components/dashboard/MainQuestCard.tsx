'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface MainQuestCardProps {
  completedModuleIds: string[]
}

export default function MainQuestCard({ completedModuleIds }: MainQuestCardProps) {
  const isCompleted = completedModuleIds.includes('intro-tata-surya')
  
  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 shadow-2xl group">
      <div className="absolute top-0 right-0 w-64 h-64 -mr-16 -mt-16 bg-violet-600/10 rounded-full blur-3xl group-hover:bg-violet-600/20 transition-all duration-700" />
      
      <div className="relative z-10 flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.4)]">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-400">Main Quest Progress</p>
              <h3 className="text-2xl font-bold text-white tracking-tight">{isCompleted ? 'Bab 2: Evolusi Bintang' : 'Bab 1: Tata Surya'}</h3>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <span className="text-sm font-medium text-slate-300">{isCompleted ? 'Modul: Pembentukan Protobintang' : 'Modul: Mengenal Tata Surya'}</span>
              <span className="text-sm font-black text-white">{isCompleted ? '45%' : '0%'}</span>
            </div>
            <div className="w-full h-3 bg-slate-950 rounded-full border border-slate-800 p-0.5 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-violet-600 via-indigo-500 to-fuchsia-600 rounded-full relative"
                style={{ width: isCompleted ? '45%' : '0%' }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_2s_infinite]" />
              </div>
            </div>
          </div>

          <Link href={isCompleted ? '#' : '/academy/tata-surya/1.1-matahari'} className="hidden md:flex bg-white hover:bg-slate-100 text-slate-950 px-8 py-3 rounded-xl font-bold text-sm w-fit items-center gap-2 transition-transform active:scale-95 shadow-xl">
            {isCompleted ? 'Lanjutkan Belajar' : 'Mulai Belajar'} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="w-full md:w-48 aspect-square rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center relative overflow-hidden group/star">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-transparent animate-pulse" />
          <motion.div 
            animate={{ scale: [1, 1.1, 1], rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]"
          >
            <Star className="w-full h-full fill-current" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
