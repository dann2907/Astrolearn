import {
  Archive,
  BookOpen,
  BrainCircuit,
  Network,
  Rocket,
  Trophy,
  User,
  Zap,
} from "lucide-react";

import { NavButton } from "@/components/shared/nav-button";
import { ProgressBar } from "@/components/shared/progress-bar";
import { useUserStore } from "@/store/use-user-store";

const mainNav = [
  { id: "dashboard", icon: Rocket, label: "Dashboard" },
  { id: "academy", icon: BookOpen, label: "Akademi" },
  { id: "quiz", icon: BrainCircuit, label: "Arena Kuis" },
];

interface SidebarProps {
  currentView: string;
  levelProgress: number;
  onNavigate: (view: string) => void;
}

export function Sidebar({
  currentView,
  levelProgress,
  onNavigate,
}: Readonly<SidebarProps>) {
  const userData = useUserStore((state) => state.userData);

  return (
    <aside className="hidden md:flex flex-col w-60 bg-slate-950 border-r border-slate-800/50 h-screen sticky top-0 overflow-y-auto z-40">
      <div className="p-6">
        <div className="flex items-center gap-2 text-violet-400 mb-8">
          <Rocket className="w-8 h-8 fill-current" />
          <span className="font-black text-2xl tracking-tighter text-white">
            ASTROLEARN
          </span>
        </div>

        <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-800/50 mb-8 cursor-pointer hover:bg-slate-900 transition group">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-linear-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center border-2 border-slate-800 group-hover:border-violet-400 transition shadow-lg">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">
                {userData.name}
              </p>
              <p className="text-[10px] text-violet-400 font-bold uppercase tracking-wider">
                {userData.rank}
              </p>
            </div>
          </div>
          <ProgressBar
            value={levelProgress}
            className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden"
            indicatorClassName="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
          />
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 ml-2">
              Utama
            </p>
            <div className="space-y-1">
              {mainNav.map((item) => (
                <NavButton
                  key={item.id}
                  item={item}
                  currentView={currentView}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
