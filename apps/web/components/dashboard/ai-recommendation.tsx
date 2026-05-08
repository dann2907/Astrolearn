import { AnimatePresence, motion } from "framer-motion";
import { BrainCircuit, Sparkles, X } from "lucide-react";

import { useUiStore } from "@/store/use-ui-store";

interface AIRecommendationProps {
  onNavigate: (view: string) => void;
}

export function AIRecommendation({ onNavigate }: AIRecommendationProps) {
  const showAiRec = useUiStore((state) => state.showAiRec);
  const dismissAiRecommendation = useUiStore(
    (state) => state.dismissAiRecommendation,
  );

  return (
    <AnimatePresence>
      {showAiRec && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 relative group overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.05)]"
        >
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <button
            onClick={dismissAiRecommendation}
            className="absolute top-4 right-4 text-slate-600 hover:text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-500 shadow-inner shrink-0">
            <BrainCircuit className="w-10 h-10" />
          </div>

          <div className="flex-1 text-center md:text-left space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2 text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                AI Recommendation
              </span>
            </div>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Berdasarkan hasil kuis terakhirmu, topik{" "}
              <b className="text-white">Klasifikasi Spektrum Bintang</b> perlu
              kamu ulang. Siap tingkatkan akurasi?
            </p>
          </div>

          <button
            onClick={() => onNavigate("academy")}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-amber-500/20 shrink-0"
          >
            Pelajari Ulang Sekarang
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
