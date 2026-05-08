import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Star } from "lucide-react";

import { useProgressStore } from "@/store/use-progress-store";

interface MainQuestCardProps {
  onNavigate: (view: string) => void;
}

export function MainQuestCard({ onNavigate }: MainQuestCardProps) {
  const quest = useProgressStore((state) => state.mainQuest);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 shadow-2xl group">
      <div className="absolute top-0 right-0 w-64 h-64 -mr-16 -mt-16 bg-violet-600/10 rounded-full blur-3xl group-hover:bg-violet-600/20 transition-all duration-700" />
      <div className="absolute bottom-0 left-0 w-48 h-48 -ml-16 -mb-16 bg-fuchsia-600/5 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.4)]">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-400">
                Main Quest Progress
              </p>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {quest.chapter}
              </h3>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <span className="text-sm font-medium text-slate-300">
                {quest.module}
              </span>
              <span className="text-sm font-black text-white">
                {quest.progress}%
              </span>
            </div>
            <div className="w-full h-3 bg-slate-950 rounded-full border border-slate-800 p-0.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-600 via-indigo-500 to-fuchsia-600 rounded-full w-[45%] relative"
              >
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_2s_infinite]" />
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate("academy")}
            className="hidden md:flex bg-white hover:bg-slate-100 text-slate-950 px-8 py-3 rounded-xl font-bold text-sm items-center gap-2 transition-transform active:scale-95 shadow-xl"
          >
            Lanjutkan Belajar <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="w-full md:w-48 aspect-square rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center relative overflow-hidden group/star">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-transparent animate-pulse" />
          <div className="w-20 h-20 rounded-full bg-yellow-400/20 blur-2xl animate-pulse" />
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]"
          >
            <Star className="w-full h-full fill-current" />
          </motion.div>
        </div>

        <button
          onClick={() => onNavigate("academy")}
          className="md:hidden w-full bg-white text-slate-950 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
        >
          Lanjutkan Belajar <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
