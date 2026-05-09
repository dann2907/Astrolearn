"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rocket, BookOpen, Target, Trophy, Star, 
  Shield, Zap, User, Play, Clock, Flame,
  ChevronRight, ArrowLeft, MessageCircle, BrainCircuit, Loader2, Sparkles, Send,
  Search, Bell, Map, ClipboardList, Network, Archive, FileText, AlertCircle, TrendingUp, Lock, ArrowRight,
  Menu, X, CheckCircle2, Circle, GraduationCap, LogOut
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';

// === Types ===
interface UserData {
  id: string;
  name: string;
  rank: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  stardust: number;
  badges: string[];
}

interface Quest {
  id: string;
  task: string;
  reward: string;
  progress: string;
  done: boolean;
}

interface DashboardProps {
  initialUserData: UserData;
  completedModuleIds: string[];
}

// === Main Component ===
export default function Dashboard({ initialUserData, completedModuleIds }: DashboardProps) {
  const [currentView, setCurrentView] = useState('dashboard');
  const router = useRouter();
  const supabase = createClient();

  // State User
  const [userData, setUserData] = useState<UserData>(initialUserData);

  // State Quests (Hardcoded for now, could be dynamic later)
  const [quests, setQuests] = useState<Quest[]>([
    { id: '1', task: "Baca 2 sub-bab tentang Lubang Hitam", reward: "50 XP", progress: "1/2", done: false },
    { id: '2', task: "Mulai petualangan di Akademi", reward: "100 XP", progress: completedModuleIds.length > 0 ? "1/1" : "0/1", done: completedModuleIds.length > 0 },
    { id: '3', task: "Jawab 10 soal di Arena Kuis", reward: "30 XP", progress: "0/10", done: false },
  ]);

  const levelProgress = Math.round((userData.xp / userData.nextLevelXp) * 100);

  const navigateTo = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  // === UI Components ===

  const Sidebar = () => {
    const mainNav = [
      { id: 'dashboard', icon: Rocket, label: 'Dashboard', href: '/' },
      { id: 'academy', icon: BookOpen, label: 'Akademi', href: '/academy' },
      { id: 'quiz', icon: BrainCircuit, label: 'Arena Kuis', href: '/arena' },
      { id: 'game', icon: Zap, label: 'Shooter', href: '/explorer' },
    ];
    const socialNav = [
      { id: 'leaderboard', icon: Trophy, label: 'Leaderboard', href: '/leaderboard' },
      { id: 'skilltree', icon: Network, label: 'Skill Tree', href: '/skills' },
      { id: 'collection', icon: Archive, label: 'Koleksi', href: '/collection' },
    ];

    return (
      <aside className="hidden md:flex flex-col w-[240px] bg-slate-950 border-r border-slate-800/50 h-screen sticky top-0 overflow-y-auto z-40">
        <div className="p-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-violet-400 mb-8">
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
             <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-all">
                <LogOut className="w-5 h-5" />
                <span>Keluar Sesi</span>
             </button>
          </div>
        </div>
      </aside>
    );
  };

  const NavBtn = ({ item }: { item: any }) => {
    const isActive = currentView === item.id || (item.id === 'dashboard' && currentView === 'dashboard');
    
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
    );
  };

  const MobileNav = () => (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-slate-950/80 backdrop-blur-xl border-t border-slate-800/50 z-50 flex items-center justify-around px-2">
      {[
        { id: 'dashboard', icon: Rocket, label: 'Home', href: '/' },
        { id: 'academy', icon: BookOpen, label: 'Akademi', href: '/academy' },
        { id: 'quiz', icon: BrainCircuit, label: 'Kuis', href: '/arena' },
        { id: 'game', icon: Zap, label: 'Shooter', href: '/explorer' },
        { id: 'profile', icon: User, label: 'Profil', href: '/profile' },
      ].map(item => (
        <Link 
          key={item.id}
          href={item.href}
          className={`flex flex-col items-center gap-1 min-w-[64px] transition-colors ${
            currentView === item.id ? 'text-violet-400' : 'text-slate-500'
          }`}
        >
          <item.icon className="w-5 h-5" />
          <span className="text-[9px] font-bold uppercase tracking-wide">{item.label}</span>
        </Link>
      ))}
    </nav>
  );

  const Header = () => (
    <header className="bg-slate-950/50 backdrop-blur-md sticky top-0 z-30 border-b border-slate-900/50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">
            Selamat datang, <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">{userData.rank} {userData.name}!</span>
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">Level {userData.level} &bull; {levelProgress}% menuju level berikutnya</p>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <div className="flex flex-col items-end gap-1.5 min-w-[200px]">
            <div className="flex justify-between w-full text-[10px] font-bold uppercase tracking-wider">
              <span className="text-violet-400">{userData.xp} XP</span>
              <span className="text-slate-500">{userData.nextLevelXp} XP</span>
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-full border border-slate-800 p-0.5 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${levelProgress}%` }}
                className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full relative"
              >
                <div className="absolute inset-0 bg-white/20 mix-blend-overlay animate-pulse" />
              </motion.div>
            </div>
            <div className="flex items-center gap-1.5 self-end">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span className="text-xs font-bold text-amber-500">{userData.stardust.toLocaleString()} Stardust</span>
            </div>
          </div>

          <Link 
            href="/academy/intro-tata-surya"
            className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            Lanjutkan Belajar
          </Link>
        </div>
      </div>
    </header>
  );

  const QuickStats = () => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[
        { label: "Win Rate Kuis", value: "78%", icon: Target, color: "text-fuchsia-400", bg: "bg-fuchsia-400/5", border: "border-fuchsia-400/20" },
        { label: "Top Skor Shooter", value: "12,450", icon: Trophy, color: "text-amber-400", bg: "bg-amber-400/5", border: "border-amber-400/20" },
        { label: "Streak Belajar", value: "4 Hari", icon: Flame, color: "text-orange-500", bg: "bg-orange-500/5", border: "border-orange-500/20", extra: <Flame className="w-4 h-4 fill-current animate-bounce" /> },
      ].map((stat, i) => (
        <motion.div 
          key={i}
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
  );

  const MainQuestCard = () => {
    const isCompleted = completedModuleIds.includes('intro-tata-surya');
    
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
    );
  };

  const LearningPathMap = () => {
    const isIntroDone = completedModuleIds.includes('sc-matahari');
    
    const nodes = [
      { id: '1', label: 'Tata Surya', status: isIntroDone ? 'completed' : 'active', progress: isIntroDone ? 100 : 0, icon: isIntroDone ? CheckCircle2 : Play },
      { id: '2', label: 'Bintang', status: isIntroDone ? 'active' : 'locked', progress: 0, icon: isIntroDone ? Play : Lock },
      { id: '3', label: 'Galaksi', status: 'locked', progress: 0, icon: Lock },
    ];

    return (
      <div className="bg-slate-950 border border-slate-900 rounded-3xl p-8 relative overflow-hidden">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-lg font-bold text-white flex items-center gap-3">
            <Map className="w-5 h-5 text-indigo-400" /> Learning Path Map
          </h3>
          <button onClick={() => navigateTo('academy')} className="text-xs font-bold text-violet-400 hover:text-violet-300 transition-colors uppercase tracking-widest">Kurikulum</button>
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
            {nodes.map((node, i) => (
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
    );
  };

  const DailyQuests = () => (
    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-3">
          <Target className="w-5 h-5 text-fuchsia-400" /> Daily Quests
        </h3>
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{quests.filter(q => q.done).length}/{quests.length}</span>
      </div>

      <div className="space-y-3 flex-1">
        {quests.map((quest) => (
          <motion.div 
            key={quest.id} 
            layout
            className={`group p-4 rounded-2xl border transition-all ${
              quest.done ? 'bg-slate-950/30 border-slate-900/50' : 'bg-slate-950 border-slate-800/50 hover:border-slate-700 shadow-lg'
            }`}
          >
            <div className="flex items-start gap-3">
              <div 
                className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                  quest.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-700'
                }`}
              >
                {quest.done && <CheckCircle2 className="w-3.5 h-3.5" />}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className={`text-sm font-bold leading-snug transition-all ${quest.done ? 'text-slate-600 line-through' : 'text-slate-200'}`}>
                  {quest.task}
                </h4>
                <div className="flex items-center justify-between mt-2">
                  <p className={`text-[10px] font-black uppercase tracking-wider ${quest.done ? 'text-slate-700' : 'text-amber-500'}`}>
                    Reward: {quest.reward}
                  </p>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${quest.done ? 'bg-slate-900 text-slate-600' : 'bg-slate-800 text-slate-400'}`}>
                    {quest.progress}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-violet-500/30 overflow-x-hidden pb-20 md:pb-0">
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          
          <main className="p-4 md:p-8 lg:p-12 space-y-10 max-w-7xl mx-auto w-full">
            
            {/* Arena & Leaderboard Quick Access */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Link
                href="/arena"
                className="group block p-8 bg-gradient-to-br from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 rounded-3xl text-white text-center transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
                <h3 className="text-3xl font-black mb-2 flex items-center justify-center gap-2">
                  <Zap className="w-8 h-8 fill-yellow-400 text-yellow-400" /> ARENA KUIS
                </h3>
                <p className="text-cyan-100 font-medium">Uji pengetahuan astronomimu dalam 60 detik!</p>
              </Link>

              <Link
                href="/leaderboard"
                className="group block p-8 bg-gradient-to-br from-amber-600 to-orange-700 hover:from-amber-500 hover:to-orange-600 rounded-3xl text-white text-center transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
                <h3 className="text-3xl font-black mb-2 flex items-center justify-center gap-2">
                  <Trophy className="w-8 h-8 fill-yellow-300 text-yellow-300" /> LEADERBOARD
                </h3>
                <p className="text-amber-100 font-medium">Lihat siapa penjelajah antariksa terbaik!</p>
              </Link>
            </div>

            <QuickStats />

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
              <div className="xl:col-span-8 space-y-10">
                <MainQuestCard />
                <LearningPathMap />
              </div>

              <div className="xl:col-span-4 h-full">
                <DailyQuests />
              </div>
            </div>
          </main>
        </div>
      </div>

      <MobileNav />

      <style jsx global>{`
        @keyframes shimmer {
          100% { background-position: -250% -250%; }
        }
      `}</style>
    </div>
  );
}
