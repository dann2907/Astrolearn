'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Map, CheckCircle2, Play, Lock } from 'lucide-react'

interface LearningPathMapProps {
  completedModuleIds: string[]
}

export default function LearningPathMap({ completedModuleIds }: LearningPathMapProps) {
  const isIntroDone = completedModuleIds.includes('sc-matahari')
  
  const nodes = [
    { id: '1', label: 'Tata Surya', status: isIntroDone ? 'completed' : 'active', progress: isIntroDone ? 100 : 0, icon: isIntroDone ? CheckCircle2 : Play },
    { id: '2', label: 'Bintang', status: isIntroDone ? 'active' : 'locked', progress: 0, icon: isIntroDone ? Play : Lock },
    { id: '3', label: 'Galaksi', status: 'locked', progress: 0, icon: Lock },
  ]

  return (
    <div className="bg-slate-950 border border-slate-900 rounded-3xl p-8 relative overflow-hidden">
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-lg font-bold text-white flex items-center gap-3">
          <Map className="w-5 h-5 text-indigo-400" /> Learning Path Map
        </h3>
        <button className="text-xs font-bold text-violet-400 hover:text-violet-300 transition-colors uppercase tracking-widest">Kurikulum</button>
      </div>

      <div className="relative px-4 py-8">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-12 right-12 h-1 bg-slate-900 -z-0 transform -translate-y-1/2 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: isIntroDone ? '45%' : '0%' }}
            className="h-full bg-gradient-to-r from-emerald-500 to-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.3)]"
          />
        </div>

        <div className="flex justify-between items-center relative z-10">
          {nodes.map((node) => (
            <div key={node.id} className="flex flex-col items-center gap-4">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 shadow-xl ${
                  node.status === 'completed' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500 shadow-emerald-500/20' :
                  node.status === 'active' ? 'bg-violet-600/10 border-violet-500 text-violet-400 shadow-violet-500/30' :
                  'bg-slate-900 border-slate-800 text-slate-600'
                } ${node.status === 'active' ? 'animate-pulse' : ''}`}
              >
                <node.icon className="w-7 h-7" />
              </motion.div>
              <div className="text-center">
                <p className={`text-sm font-bold ${node.status === 'locked' ? 'text-slate-600' : 'text-white'}`}>{node.label}</p>
                <p className="text-[10px] font-bold text-slate-500 mt-0.5">{node.status === 'locked' ? 'Terkunci' : `${node.progress}% Selesai`}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
