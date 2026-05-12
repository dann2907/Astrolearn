import { Trophy, User } from "lucide-react";

import { GlassCard } from "@/components/shared/glass-card";
import { SectionTitle } from "@/components/shared/section-title";
import { leaderboardPlayers } from "@/lib/constants/leaderboard";

interface LeaderboardPreviewProps {
  onNavigate: (view: string) => void;
}

export function LeaderboardPreview({ onNavigate }: Readonly<LeaderboardPreviewProps>) {
  return (
    <GlassCard>
      <div className="flex justify-between items-center mb-6">
        <SectionTitle icon={Trophy} iconClassName="text-amber-500">
          Leaderboard
        </SectionTitle>
        <button
          onClick={() => onNavigate("leaderboard")}
          className="text-[10px] font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest"
        >
          Lihat Semua
        </button>
      </div>
      <div className="space-y-3">
        {leaderboardPlayers.map((player) => (
          <div
            key={player.r}
            className={`flex justify-between items-center p-4 rounded-2xl transition-all ${
              player.me
                ? "bg-violet-900/20 border border-violet-500/30 shadow-lg"
                : "bg-slate-950 border border-slate-900 hover:border-slate-800"
            }`}
          >
            <div className="flex gap-4 items-center">
              <span
                className={`font-black text-sm w-6 text-center ${
                  player.r === 1 ? "text-amber-400" : "text-slate-500"
                }`}
              >
                #{player.r}
              </span>
              <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                <User className="w-4 h-4 text-slate-500" />
              </div>
              <span
                className={`text-sm font-bold ${
                  player.me ? "text-white" : "text-slate-300"
                }`}
              >
                {player.n}
              </span>
            </div>
            <span className="text-amber-500 font-black tracking-tighter text-sm">
              {player.s.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
