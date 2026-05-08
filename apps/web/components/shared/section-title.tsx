import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface SectionTitleProps {
  icon: LucideIcon;
  children: ReactNode;
  iconClassName: string;
}

export function SectionTitle({
  icon: Icon,
  children,
  iconClassName,
}: SectionTitleProps) {
  return (
    <h3 className="text-lg font-bold text-white flex items-center gap-3">
      <Icon className={`w-5 h-5 ${iconClassName}`} /> {children}
    </h3>
  );
}
