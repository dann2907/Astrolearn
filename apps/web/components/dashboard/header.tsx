import { Play, Star, User } from "lucide-react";

import { ProgressBar } from "@/components/shared/progress-bar";
import { useUserStore } from "@/store/use-user-store";

interface HeaderProps {
  levelProgress: number;
  onNavigate: (view: string) => void;
}

export function Header({ levelProgress, onNavigate }: HeaderProps) {
  const userData = useUserStore((state) => state.userData);

  return (
    <header className="bg-slate-950/50 backdrop-blur-md sticky top-0 z-30 border-b border-slate-900/50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">
            Selamat datang,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              Navigator {userData.name}!
            </span>
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Level {userData.level} &bull; {levelProgress}% menuju Captain
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <div className="flex flex-col items-end gap-1.5 min-w-[200px]">
            <div className="flex justify-between w-full text-[10px] font-bold uppercase tracking-wider">
              <span className="text-violet-400">{userData.xp} XP</span>
              <span className="text-slate-500">{userData.nextLevelXp} XP</span>
            </div>
            <ProgressBar value={levelProgress} />
            <div className="flex items-center gap-1.5 self-end">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span className="text-xs font-bold text-amber-500">
                {userData.stardust.toLocaleString()} Stardust
              </span>
            </div>
          </div>

          <button
            onClick={() => onNavigate("academy")}
            className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            Lanjutkan Belajar
          </button>
        </div>

        <div className="lg:hidden flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-900/80 px-2 py-1 rounded-lg border border-slate-800">
            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
            <span className="text-[10px] font-bold text-amber-500">
              {userData.stardust}
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
            <User className="w-5 h-5 text-slate-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
