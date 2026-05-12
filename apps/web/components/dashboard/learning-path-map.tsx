"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Lock, Play, Map as MapIcon, ChevronRight } from "lucide-react";
import { useProgressStore } from "@/store/use-progress-store";

interface LearningPathMapProps {
  onNavigate: (view: string) => void;
}

export function LearningPathMap({ onNavigate }: Readonly<LearningPathMapProps>) {
  const nodes = useProgressStore((state) => state.learningNodes);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <div className="bg-slate-950/40 border border-slate-900 rounded-3xl p-8 relative overflow-hidden">
      <div className="flex justify-between items-center mb-12">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
          <MapIcon className="w-4 h-4 text-indigo-500" />
          Peta Perjalanan Kosmik
        </h3>
        <button
          onClick={() => onNavigate("academy")}
          className="text-[10px] font-bold text-slate-500 hover:text-white flex items-center gap-1 transition-colors uppercase tracking-wider"
        >
          Lihat Kurikulum <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      <div className="relative flex justify-between items-center max-w-2xl mx-auto py-4">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-slate-900 z-0 -translate-y-1/2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "50%" }}
            className="h-full bg-linear-to-r from-emerald-500/50 to-violet-500/50"
          />
        </div>

        {nodes.map((node, index) => (
          <div key={node.id} className="relative z-10 flex flex-col items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
              className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${
                node.status === "completed"
                  ? "bg-emerald-500/10 border-emerald-500 text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                  : node.status === "active"
                    ? "bg-violet-600/10 border-violet-500 text-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.3)] animate-pulse"
                    : "bg-slate-900 border-slate-800 text-slate-700"
              }`}
            >
              {node.status === "completed" ? (
                <CheckCircle2 className="w-6 h-6" />
              ) : node.status === "active" ? (
                <Play className="w-6 h-6 fill-current" />
              ) : (
                <Lock className="w-5 h-5" />
              )}
            </motion.button>
            
            <div className="text-center">
              <p className={`text-[10px] font-black uppercase tracking-widest ${
                node.status === "locked" ? "text-slate-700" : "text-slate-300"
              }`}>
                {node.label}
              </p>
            </div>

            {/* Tooltip */}
            <AnimatePresence>
              {activeNode === node.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="absolute bottom-full mb-6 w-48 bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-2xl z-20 pointer-events-auto"
                >
                  <div className="text-left space-y-2">
                    <p className="text-[10px] font-black text-violet-400 uppercase tracking-widest">
                      {node.status === "locked" ? "Terkunci" : "Status"}
                    </p>
                    <p className="text-xs font-bold text-white leading-tight">
                      {node.status === "locked" 
                        ? "Selesaikan bab sebelumnya untuk membuka" 
                        : node.status === "completed"
                          ? "Bab telah diselesaikan sepenuhnya! Mantap."
                          : "Sedang dipelajari. Selesaikan yuk?"}
                    </p>
                    {node.status !== "locked" && (
                      <div className="pt-2">
                         <div className="flex justify-between text-[9px] font-bold text-slate-500 uppercase mb-1">
                           <span>Progress</span>
                           <span>{node.progress}%</span>
                         </div>
                         <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                           <div 
                             className="h-full bg-violet-500" 
                             style={{ width: `${node.progress}%` }} 
                           />
                         </div>
                      </div>
                    )}
                    {node.status === "active" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate("academy");
                        }}
                        className="w-full mt-3 bg-violet-600 py-2 rounded-lg text-[10px] font-black text-white uppercase tracking-widest hover:bg-violet-500 transition-colors"
                      >
                        Lanjutkan
                      </button>
                    )}
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
