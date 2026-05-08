import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface NavButtonProps {
  item: {
    id: string;
    icon: LucideIcon;
    label: string;
  };
  currentView: string;
  onNavigate: (view: string) => void;
}

export function NavButton({ item, currentView, onNavigate }: NavButtonProps) {
  const isActive = currentView === item.id;

  return (
    <button
      onClick={() => onNavigate(item.id)}
      className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
        isActive
          ? "bg-violet-600/10 text-white"
          : "text-slate-400 hover:text-slate-100 hover:bg-slate-900/50"
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="nav-pill"
          className="absolute left-0 w-1 h-5 bg-violet-500 rounded-r-full"
        />
      )}
      <item.icon
        className={`w-5 h-5 transition-transform group-hover:scale-110 ${
          isActive
            ? "text-violet-400"
            : "text-slate-500 group-hover:text-slate-300"
        }`}
      />
      <span className={isActive ? "font-bold" : ""}>{item.label}</span>
    </button>
  );
}
