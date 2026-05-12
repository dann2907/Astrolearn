import { BookOpen, BrainCircuit, Menu, Rocket, Zap } from "lucide-react";

const mobileNav = [
  { id: "dashboard", icon: Rocket, label: "Home" },
  { id: "academy", icon: BookOpen, label: "Akademi" },
  { id: "quiz", icon: BrainCircuit, label: "Kuis" },
];

interface MobileNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export function MobileNav({ currentView, onNavigate }: Readonly<MobileNavProps>) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-slate-950/80 backdrop-blur-xl border-t border-slate-800/50 z-50 flex items-center justify-around px-2">
      {mobileNav.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`flex flex-col items-center gap-1 min-w-16 transition-colors ${
            currentView === item.id ? "text-violet-400" : "text-slate-500"
          }`}
        >
          <item.icon className="w-5 h-5" />
          <span className="text-[9px] font-bold uppercase tracking-wide">
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
}
