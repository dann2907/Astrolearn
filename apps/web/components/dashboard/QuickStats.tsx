'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Target, Trophy, Flame } from 'lucide-react'

export default function QuickStats() {
  const stats = [
    { label: "Win Rate Kuis", value: "78%", icon: Target, color: "text-fuchsia-400", bg: "bg-fuchsia-400/5", border: "border-fuchsia-400/20" },
    { label: "Top Skor Shooter", value: "12,450", icon: Trophy, color: "text-amber-400", bg: "bg-amber-400/5", border: "border-amber-400/20" },
    { label: "Streak Belajar", value: "4 Hari", icon: Flame, color: "text-orange-500", bg: "bg-orange-500/5", border: "border-orange-500/20", extra: <Flame className="w-4 h-4 fill-current animate-bounce" /> },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat, i) => (
        <motion.div 
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`p-5 rounded-2xl border ${stat.border} ${stat.bg} flex items-center gap-4 transition-all shadow-lg backdrop-blur-sm`}
        >
          <div className={`p-3 rounded-xl bg-slate-950/50 ${stat.color} shadow-inner`}>
            <stat.icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-0.5">{stat.label}</p>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-white">{stat.value}</span>
              {stat.extra}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
