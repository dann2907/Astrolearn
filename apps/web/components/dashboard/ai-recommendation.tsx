import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrainCircuit, Sparkles, X } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { useUiStore } from "@/store/use-ui-store";

interface AIRecommendationProps {
  onNavigate: (view: string) => void;
}

export function AIRecommendation({ onNavigate }: Readonly<AIRecommendationProps>) {
  const [rec, setRec] = useState<any>(null);
  const showAiRec = useUiStore((state) => state.showAiRec);
  const dismissAiRecommendation = useUiStore(
    (state) => state.dismissAiRecommendation,
  );
  const router = useRouter();

  useEffect(() => {
    const fetchRec = async () => {
      try {
        const data = await apiClient.get("/recommendations/review");
        setRec(data);
      } catch (error) {
        console.error("Failed to fetch recommendation", error);
      }
    };
    fetchRec();
  }, []);

  if (!rec) return null;

  return (
    <AnimatePresence>
      {showAiRec && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-linear-to-r from-amber-500/10 to-transparent border border-amber-500/20 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 relative group overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.05)]"
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
            <div className="flex items-center justify-center md:justify-start gap-2 text-amber-500">
              <Sparkles className="w-3 h-3" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                Tips Oracle
              </span>
            </div>
            <p className="text-slate-100 font-bold text-sm md:text-base leading-relaxed">
              {rec.message}
            </p>
          </div>

          {rec.slug && (
            <button
              onClick={() => router.push(`/academy/${rec.slug}`)}
              className="bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 shrink-0"
            >
              Ulang Materi
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
