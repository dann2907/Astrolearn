import { motion } from "framer-motion";
import { Lock, Shield } from "lucide-react";

import { GlassCard } from "@/components/shared/glass-card";
import { SectionTitle } from "@/components/shared/section-title";
import { useUserStore } from "@/store/use-user-store";

interface AchievementsProps {
  onNavigate: (view: string) => void;
}

export function Achievements({ onNavigate }: AchievementsProps) {
  const badges = useUserStore((state) => state.userData.badges);

  return (
    <GlassCard>
      <div className="flex justify-between items-center mb-6">
        <SectionTitle icon={Shield} iconClassName="text-emerald-400">
          Achievements
        </SectionTitle>
        <button
          onClick={() => onNavigate("collection")}
          className="text-[10px] font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest"
        >
          Koleksi
        </button>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
        {badges.map((badge) => (
          <motion.div
            key={badge}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center gap-2 bg-slate-950 p-4 rounded-2xl border border-slate-900 hover:border-violet-500/50 group"
          >
            <div className="w-12 h-12 rounded-xl bg-violet-600/10 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform">
              <Shield className="w-8 h-8" />
            </div>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter text-center leading-tight">
              {badge}
            </span>
          </motion.div>
        ))}
        <div className="flex flex-col items-center gap-2 bg-slate-950/50 p-4 rounded-2xl border border-slate-900 border-dashed opacity-40">
          <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-600">
            <Lock className="w-6 h-6" />
          </div>
          <span className="text-[9px] font-black text-slate-600 uppercase tracking-tighter text-center leading-tight">
            Rahasia
          </span>
        </div>
      </div>
    </GlassCard>
  );
}
