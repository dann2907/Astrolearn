import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8 space-y-6">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="text-violet-500"
      >
        <Rocket className="w-12 h-12 fill-current" />
      </motion.div>
      <div className="w-48 h-1 bg-slate-900 rounded-full overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full bg-gradient-to-r from-transparent via-violet-500 to-transparent"
        />
      </div>
      <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-600 animate-pulse">
        Initializing Cosmic Systems
      </p>
    </div>
  );
}
