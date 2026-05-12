'use client'

import dynamic from 'next/dynamic'

const OrbitSimulation = dynamic(() => import('./OrbitSimulation'), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-slate-900 animate-pulse rounded-3xl border border-slate-800 flex items-center justify-center text-xs font-bold text-slate-500 uppercase tracking-widest">Memuat Simulasi 3D...</div>
})

export default OrbitSimulation
