import React, { useState } from 'react';
import { Rocket, User, Download, MousePointerClick, Info, Orbit } from 'lucide-react';

export default function MateriTataSurya() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  // Data Planet untuk Simulasi & Info Panel
  const solarSystemData = [
    {
      id: "matahari",
      name: "Matahari",
      mockImg: "/mock-matahari.png", // Ganti dengan path gambar asli nanti
      colorFallback: "bg-gradient-to-tr from-orange-600 to-yellow-400 shadow-[0_0_50px_rgba(250,204,21,0.4)]",
      size: "w-24 h-24 md:w-36 md:h-36",
      position: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10",
      ukuran: "1.392.700 km",
      jarak: "0 km (Pusat)",
      revolusi: "-",
      fakta: "Matahari menyumbang 99,86% dari total massa seluruh Tata Surya kita."
    },
    {
      id: "merkurius",
      name: "Merkurius",
      mockImg: "/mock-merkurius.png",
      colorFallback: "bg-gradient-to-tr from-slate-500 to-slate-300",
      size: "w-6 h-6",
      position: "left-[55%] top-[40%] z-20",
      orbitSize: "w-[140px] h-[60px] md:w-[200px] md:h-[80px]",
      ukuran: "4.879 km",
      jarak: "57,9 Juta km",
      revolusi: "88 Hari",
      fakta: "Planet terkecil dan terdekat dengan Matahari, namun bukan yang paling panas."
    },
    {
      id: "venus",
      name: "Venus",
      mockImg: "/mock-venus.png",
      colorFallback: "bg-gradient-to-tr from-orange-300 to-amber-100",
      size: "w-8 h-8",
      position: "left-[35%] top-[55%] z-20",
      orbitSize: "w-[200px] h-[90px] md:w-[300px] md:h-[120px]",
      ukuran: "12.104 km",
      jarak: "108,2 Juta km",
      revolusi: "225 Hari",
      fakta: "Planet terpanas di Tata Surya karena efek rumah kaca ekstrem dari atmosfernya."
    },
    {
      id: "bumi",
      name: "Bumi",
      mockImg: "/mock-bumi.png",
      colorFallback: "bg-gradient-to-tr from-blue-500 to-green-400",
      size: "w-9 h-9",
      position: "left-[20%] top-[40%] z-20",
      orbitSize: "w-[280px] h-[120px] md:w-[420px] md:h-[180px]",
      ukuran: "12.742 km",
      jarak: "149,6 Juta km",
      revolusi: "365,25 Hari",
      fakta: "Satu-satunya planet yang diketahui memiliki kehidupan dan air dalam bentuk cair di permukaannya."
    },
    {
      id: "mars",
      name: "Mars",
      mockImg: "/mock-mars.png",
      colorFallback: "bg-gradient-to-tr from-red-600 to-orange-500",
      size: "w-7 h-7",
      position: "left-[70%] top-[30%] z-20",
      orbitSize: "w-[360px] h-[150px] md:w-[540px] md:h-[240px]",
      ukuran: "6.779 km",
      jarak: "227,9 Juta km",
      revolusi: "687 Hari",
      fakta: "Dijuluki Planet Merah karena kandungan besi oksida (karat) di permukaannya."
    },
    {
      id: "jupiter",
      name: "Jupiter",
      mockImg: "/mock-jupiter.png",
      colorFallback: "bg-gradient-to-tr from-amber-700 to-orange-300",
      size: "w-14 h-14 md:w-16 md:h-16",
      position: "left-[80%] top-[55%] z-20",
      orbitSize: "w-[460px] h-[200px] md:w-[680px] md:h-[300px]",
      ukuran: "139.820 km",
      jarak: "778,5 Juta km",
      revolusi: "11,8 Tahun",
      fakta: "Planet terbesar. Memiliki Bintik Merah Raksasa yang merupakan badai besar selama ratusan tahun."
    },
    {
      id: "saturnus",
      name: "Saturnus",
      mockImg: "/mock-saturnus.png",
      colorFallback: "bg-gradient-to-tr from-yellow-600 to-amber-200",
      size: "w-12 h-12 md:w-14 md:h-14",
      position: "left-[15%] top-[70%] z-20",
      orbitSize: "w-[560px] h-[240px] md:w-[820px] md:h-[360px]",
      hasRing: true,
      ukuran: "116.460 km",
      jarak: "1,43 Miliar km",
      revolusi: "29,5 Tahun",
      fakta: "Memiliki sistem cincin paling spektakuler yang terbuat dari miliaran bongkahan es dan batu."
    },
    {
      id: "uranus",
      name: "Uranus",
      mockImg: "/mock-uranus.png",
      colorFallback: "bg-gradient-to-tr from-cyan-400 to-blue-200",
      size: "w-10 h-10 md:w-12 md:h-12",
      position: "left-[45%] top-[85%] z-20",
      orbitSize: "w-[660px] h-[280px] md:w-[960px] md:h-[420px]",
      ukuran: "50.724 km",
      jarak: "2,87 Miliar km",
      revolusi: "84 Tahun",
      fakta: "Planet yang berputar menyamping; sumbu rotasinya hampir sejajar dengan bidang orbitnya."
    },
    {
      id: "neptunus",
      name: "Neptunus",
      mockImg: "/mock-neptunus.png",
      colorFallback: "bg-gradient-to-tr from-blue-700 to-blue-400",
      size: "w-9 h-9 md:w-11 md:h-11",
      position: "left-[75%] top-[75%] z-20",
      orbitSize: "w-[760px] h-[320px] md:w-[1100px] md:h-[480px]",
      ukuran: "49.244 km",
      jarak: "4,5 Miliar km",
      revolusi: "165 Tahun",
      fakta: "Planet paling berangin di Tata Surya, dengan kecepatan angin mencapai 2.100 km/jam."
    }
  ];

  // --- KOMPONEN NAVBAR ---
  const renderHeader = () => (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 text-violet-400 cursor-pointer">
          <Rocket className="w-6 h-6 text-amber-500" />
          <span className="font-bold text-xl tracking-wider text-white">ASTROLEARN</span>
        </div>
        
        {/* Profile / Login */}
        <div className="flex items-center gap-3 bg-slate-900 rounded-full pl-1 pr-4 py-1 border border-slate-700 cursor-pointer hover:border-violet-500 transition shadow-sm">
          <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center border-2 border-slate-950">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="text-white text-xs font-bold">Login / Profile</div>
        </div>
      </div>
    </header>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-violet-500/30 flex flex-col relative overflow-hidden">
      
      {/* Background Bintang */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
        {/* Subtle Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px]"></div>
      </div>

      {renderHeader()}

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 flex flex-col z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Simulasi Tata Surya</h1>
            <p className="text-slate-400">Klik planet untuk mengetahui lebih detailnya!</p>
          </div>
          <button className="flex items-center gap-2 border border-amber-500/50 hover:bg-amber-500/10 text-amber-400 font-medium py-2 px-5 rounded-lg transition">
            <Download className="w-4 h-4" /> Materi untuk Guru
          </button>
        </div>

        {/* Main Content: Map & Info Panel */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 flex-1">
          
          {/* LEFT: Peta Simulasi */}
          <div className="flex-1 relative min-h-[500px] lg:min-h-0 bg-slate-900/20 border border-slate-800/50 rounded-3xl overflow-hidden flex items-center justify-center">
            
            {/* Center Anchor Point for Orbits */}
            <div className="relative w-full h-full max-w-[800px] max-h-[600px] flex items-center justify-center">
              
              {/* Render Garis Orbit */}
              {solarSystemData.slice(1).map((planet) => (
                <div 
                  key={`orbit-${planet.id}`}
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-600/30 ${planet.orbitSize}`}
                ></div>
              ))}

              {/* Render Planet & Matahari */}
              {solarSystemData.map((planet) => (
                <div 
                  key={planet.id}
                  className={`absolute flex flex-col items-center justify-center cursor-pointer group ${planet.position}`}
                  onClick={() => setSelectedPlanet(planet)}
                >
                  <div className={`
                    relative rounded-full transition-transform duration-300 ease-out flex items-center justify-center overflow-hidden
                    ${planet.size} 
                    ${planet.colorFallback} 
                    ${selectedPlanet?.id === planet.id ? 'ring-4 ring-white shadow-[0_0_20px_rgba(255,255,255,0.6)] scale-110' : 'hover:scale-110 hover:ring-2 hover:ring-white/50'}
                  `}>
                    {/* MOCK IMAGE TAG 
                      Ini adalah tempat di mana Anda akan memasukkan aset gambar/ikon asli.
                      Karena saat ini src "/mock-x.png" mungkin belum ada di file Anda, 
                      maka fallback color di atas yang akan membungkusnya.
                    */}
                    <img 
                      src={planet.mockImg} 
                      alt={`Mock ${planet.name}`} 
                      className="w-full h-full object-cover opacity-80 mix-blend-overlay" // Hilangkan mix-blend jika gambar asli sudah dimasukkan
                      onError={(e) => { e.target.style.display = 'none'; }} // Menyembunyikan icon rusak jika file mock tidak ada
                    />
                    
                    {/* Efek Cincin Khusus Saturnus */}
                    {planet.hasRing && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[40%] border-4 border-amber-200/40 rounded-[100%] rotate-12"></div>
                    )}
                  </div>
                  
                  {/* Label Nama Planet */}
                  <span className={`mt-2 text-xs font-bold px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700 backdrop-blur-sm transition-opacity
                    ${selectedPlanet?.id === planet.id ? 'text-white opacity-100' : 'text-slate-300 opacity-0 group-hover:opacity-100 md:opacity-100'}
                  `}>
                    {planet.name}
                  </span>
                </div>
              ))}

            </div>
          </div>

          {/* RIGHT: Panel Informasi */}
          <div className="w-full lg:w-[350px] shrink-0">
            <div className="bg-[#0b1121] border border-slate-700/60 rounded-3xl p-8 h-full min-h-[400px] shadow-2xl relative overflow-hidden transition-all duration-300">
              
              {!selectedPlanet ? (
                /* Default View (Belum diklik) */
                <div className="flex flex-col items-center justify-center h-full text-center animate-pulse">
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-slate-500 flex items-center justify-center mb-6 bg-slate-800/30">
                    <MousePointerClick className="w-8 h-8 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Klik planet untuk melihat informasinya</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Pilih salah satu planet pada simulasi Tata Surya untuk mengetahui ukuran, jarak ke Matahari, periode revolusi, dan fakta uniknya.
                  </p>
                </div>
              ) : (
                /* Planet Info View (Sesudah diklik) */
                <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-800">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 shadow-lg ${selectedPlanet.colorFallback} overflow-hidden relative`}>
                       <img src={selectedPlanet.mockImg} alt={selectedPlanet.name} className="w-full h-full object-cover opacity-80 mix-blend-overlay" onError={(e) => { e.target.style.display = 'none'; }} />
                       {selectedPlanet.hasRing && <div className="absolute w-[140%] h-[30%] border-2 border-amber-200/50 rounded-[100%] rotate-12"></div>}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedPlanet.name}</h2>
                      <p className="text-xs text-slate-400 font-medium tracking-widest uppercase">Data Astronomi</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-800">
                      <p className="text-xs text-slate-500 mb-1">Ukuran (Diameter)</p>
                      <p className="text-white font-semibold">{selectedPlanet.ukuran}</p>
                    </div>
                    <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-800">
                      <p className="text-xs text-slate-500 mb-1">Jarak ke Matahari</p>
                      <p className="text-white font-semibold">{selectedPlanet.jarak}</p>
                    </div>
                    <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-800">
                      <p className="text-xs text-slate-500 mb-1">Periode Revolusi</p>
                      <p className="text-white font-semibold">{selectedPlanet.revolusi}</p>
                    </div>
                  </div>

                  <div className="mt-auto bg-violet-900/20 border border-violet-500/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4 text-violet-400" />
                      <span className="text-sm font-bold text-violet-300">Fakta Unik</span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {selectedPlanet.fakta}
                    </p>
                  </div>

                  <button 
                    className="mt-6 w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold transition border border-slate-700"
                    onClick={() => setSelectedPlanet(null)}
                  >
                    Tutup Info
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}