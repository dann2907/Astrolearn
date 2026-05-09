import React, { useState } from 'react';
import { 
  Globe, Gamepad2, FileQuestion, Trophy, 
  ArrowRight, Sparkles 
} from 'lucide-react';

export default function AstroLearnBeranda() {
  const [activeMenu, setActiveMenu] = useState('Beranda');

  const menus = ['Beranda', 'Materi', 'Game', 'Kuis', 'Proses&Badge'];

  const cards = [
    {
      id: 'materi',
      title: 'Materi',
      desc: 'Eksplorasi tata surya dan kenali setiap planet.',
      icon: <Globe className="w-8 h-8 text-blue-200" />,
      theme: 'bg-[#1E3A8A]', // Blue-900
      border: 'border-[#3B82F6]', // Blue-500
      buttonText: 'Mulai',
      buttonTheme: 'bg-[#3B82F6] hover:bg-[#2563EB]'
    },
    {
      id: 'game',
      title: 'Game',
      desc: 'Tantangan seru susun planet pada orbitnya!',
      icon: <Gamepad2 className="w-8 h-8 text-purple-200" />,
      theme: 'bg-[#581C87]', // Purple-900
      border: 'border-[#A855F7]', // Purple-500
      buttonText: 'Mulai',
      buttonTheme: 'bg-[#A855F7] hover:bg-[#9333EA]'
    },
    {
      id: 'kuis',
      title: 'Kuis',
      desc: 'Uji pemahamanmu tentang tata surya!',
      icon: <FileQuestion className="w-8 h-8 text-green-200" />,
      theme: 'bg-[#14532D]', // Green-900
      border: 'border-[#22C55E]', // Green-500
      buttonText: 'Mulai',
      buttonTheme: 'bg-[#22C55E] hover:bg-[#16A34A]'
    },
    {
      id: 'proses',
      title: 'Proses\n& Badge',
      desc: 'Lihat skor, progres, dan badge yang telah kamu raih.',
      icon: <Trophy className="w-8 h-8 text-orange-200" />,
      theme: 'bg-[#9A3412]', // Orange-900
      border: 'border-[#F97316]', // Orange-500
      buttonText: 'Mulai',
      buttonTheme: 'bg-[#F97316] hover:bg-[#EA580C]'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0B1A] text-white font-sans overflow-hidden relative">
      {/* Background Bintang & Efek */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Bintang-bintang kecil */}
        {[...Array(30)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-white opacity-60"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              boxShadow: Math.random() > 0.5 ? '0 0 5px 1px rgba(255,255,255,0.8)' : 'none'
            }}
          />
        ))}
        {/* Glow Effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[100px]"></div>
      </div>

      {/* Konten Utama */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 pb-12 flex flex-col min-h-screen">
        
        {/* Navbar */}
        <nav className="flex items-center justify-between py-6">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <Globe className="w-10 h-10 text-orange-400" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-4 border-2 border-blue-400 rounded-full -rotate-12"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold leading-tight">
                <span className="text-white">Astro</span><span className="text-orange-400">Learn</span>
              </h1>
              <p className="text-[10px] text-gray-400 tracking-wider">Penjelajah Tata Surya</p>
            </div>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex gap-8 text-sm font-medium">
            {menus.map((menu) => (
              <button 
                key={menu}
                onClick={() => setActiveMenu(menu)}
                className={`relative pb-1 hover:text-white transition-colors ${
                  activeMenu === menu ? 'text-white' : 'text-gray-400'
                }`}
              >
                {menu}
                {activeMenu === menu && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 rounded-t-full"></span>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center text-center mt-10 relative">
          
          {/* Elemen Dekorasi Mengambang (Simulasi 3D) */}
          <div className="absolute left-0 bottom-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] animate-bounce" style={{ animationDuration: '4s' }}>
            <span className="text-[140px]" role="img" aria-label="Astronaut">🧑‍🚀</span>
            {/* Permukaan Bulan (Fake) */}
            <div className="absolute -bottom-8 -left-10 w-64 h-24 bg-indigo-900/40 rounded-[100%] blur-xl -z-10"></div>
          </div>
          
          <div className="absolute right-10 top-10 drop-shadow-[0_0_40px_rgba(255,165,0,0.4)] animate-pulse" style={{ animationDuration: '3s' }}>
            <span className="text-[120px] inline-block transform rotate-45" role="img" aria-label="Rocket">🚀</span>
          </div>

          <div className="absolute left-[15%] top-0 opacity-80 drop-shadow-xl">
            <span className="text-[60px]" role="img" aria-label="Blue Planet">🪐</span>
          </div>
          
          <div className="absolute right-[25%] bottom-20 opacity-60 drop-shadow-xl">
            <span className="text-[40px] transform -rotate-12" role="img" aria-label="Small Planet">🌍</span>
          </div>

          <div className="absolute top-0 right-[40%] text-blue-200/50">
             <Sparkles className="w-8 h-8" />
          </div>

          {/* Teks Hero */}
          <h2 className="text-3xl font-bold mb-2 z-20">Selamat Datang di</h2>
          <h1 className="text-6xl md:text-[80px] font-extrabold tracking-tight mb-6 z-20 relative inline-block">
            <span className="text-white">Astro</span><span className="text-[#FACC15]">Learn</span>
            <div className="absolute -bottom-2 left-0 w-full h-2 bg-blue-500 rounded-full"></div>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto mb-10 z-20 font-medium">
            Belajar Tata Surya jadi lebih seru, interaktif, dan menyenangkan !
          </p>

          <button className="z-20 bg-gradient-to-b from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-full shadow-[0_0_30px_rgba(99,102,241,0.5)] transition transform hover:scale-105">
            Mulai Petualangan!
          </button>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20 z-20">
          {cards.map((card) => (
            <div 
              key={card.id} 
              className={`${card.theme} ${card.border} border-2 rounded-2xl p-6 flex flex-col h-full transform hover:-translate-y-2 transition duration-300 shadow-xl`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm`}>
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-white whitespace-pre-line leading-tight">
                  {card.title}
                </h3>
              </div>
              
              <p className="text-gray-300 text-sm flex-1 mb-6 line-clamp-3">
                {card.desc}
              </p>
              
              <button className={`${card.buttonTheme} text-white font-semibold py-2.5 px-5 rounded-lg flex items-center gap-2 w-max transition-colors shadow-md`}>
                {card.buttonText} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}