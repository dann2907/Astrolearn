import { motion } from "framer-motion";
import { CheckCircle2, Target } from "lucide-react";

import { SectionTitle } from "@/components/shared/section-title";
import { useQuestStore } from "@/store/use-quest-store";

export function DailyQuests() {
  const quests = useQuestStore((state) => state.quests).slice(0, 3);
  const toggleQuest = useQuestStore((state) => state.toggleQuest);

  return (
    <div className="bg-slate-950/40 border border-slate-900 rounded-2xl p-5">
      <div className="flex justify-between items-center mb-4 px-1">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
          <Target className="w-3 h-3 text-fuchsia-500" />
          Misi Harian
        </h3>
        <span className="text-[10px] font-bold text-slate-600">
          {quests.filter((quest) => quest.done).length}/{quests.length}
        </span>
      </div>

      <div className="space-y-2">
        {quests.map((quest) => (
          <motion.div
            key={quest.id}
            layout
            className={`p-3 rounded-xl border transition-all ${
              quest.done
                ? "bg-transparent border-slate-900/50 opacity-50"
                : "bg-slate-900/50 border-slate-800/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleQuest(quest.id)}
                className={`shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                  quest.done
                    ? "bg-emerald-600 border-emerald-600 text-white"
                    : "border-slate-700"
                }`}
              >
                {quest.done && <CheckCircle2 className="w-2.5 h-2.5" />}
              </button>
              <div className="flex-1 min-w-0">
                <h4
                  className={`text-xs font-bold truncate ${
                    quest.done ? "text-slate-600 line-through" : "text-slate-300"
                  }`}
                >
                  {quest.task}
                </h4>
              </div>
              <span className="text-[10px] font-black text-amber-500/80">
                +{quest.reward.split(' ')[0]}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
