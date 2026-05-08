import { motion } from "framer-motion";
import { CheckCircle2, Target } from "lucide-react";

import { SectionTitle } from "@/components/shared/section-title";
import { useQuestStore } from "@/store/use-quest-store";

export function DailyQuests() {
  const quests = useQuestStore((state) => state.quests);
  const toggleQuest = useQuestStore((state) => state.toggleQuest);

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <SectionTitle icon={Target} iconClassName="text-fuchsia-400">
          Daily Quests
        </SectionTitle>
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
          {quests.filter((quest) => quest.done).length}/{quests.length}
        </span>
      </div>

      <div className="space-y-3 flex-1">
        {quests.map((quest) => (
          <motion.div
            key={quest.id}
            layout
            className={`group p-4 rounded-2xl border transition-all ${
              quest.done
                ? "bg-slate-950/30 border-slate-900/50"
                : "bg-slate-950 border-slate-800/50 hover:border-slate-700 shadow-lg"
            }`}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => toggleQuest(quest.id)}
                className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                  quest.done
                    ? "bg-emerald-500 border-emerald-500 text-white"
                    : "border-slate-700 hover:border-violet-500"
                }`}
              >
                {quest.done && <CheckCircle2 className="w-3.5 h-3.5" />}
              </button>
              <div className="flex-1 min-w-0">
                <h4
                  className={`text-sm font-bold leading-snug transition-all ${
                    quest.done ? "text-slate-600 line-through" : "text-slate-200"
                  }`}
                >
                  {quest.task}
                </h4>
                <div className="flex items-center justify-between mt-2">
                  <p
                    className={`text-[10px] font-black uppercase tracking-wider ${
                      quest.done ? "text-slate-700" : "text-amber-500"
                    }`}
                  >
                    Reward: {quest.reward}
                  </p>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      quest.done
                        ? "bg-slate-900 text-slate-600"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {quest.progress}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="w-full mt-6 py-3 rounded-xl border border-slate-800 text-slate-400 font-bold text-xs hover:bg-slate-800 hover:text-white transition-all uppercase tracking-widest">
        Lihat Semua Quest
      </button>
    </div>
  );
}
