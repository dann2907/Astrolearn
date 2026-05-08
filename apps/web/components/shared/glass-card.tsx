import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "bg-slate-900/30 border border-slate-800/50 rounded-3xl p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}
