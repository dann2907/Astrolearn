import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number;
  className?: string;
  indicatorClassName?: string;
  animated?: boolean;
}

export function ProgressBar({
  value,
  className = "w-full h-2 bg-slate-900 rounded-full border border-slate-800 p-0.5 overflow-hidden",
  indicatorClassName = "h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full relative",
  animated = true,
}: ProgressBarProps) {
  const width = `${value}%`;

  if (!animated) {
    return (
      <div className={className}>
        <div className={indicatorClassName} style={{ width }} />
      </div>
    );
  }

  return (
    <div className={className}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width }}
        className={indicatorClassName}
      />
    </div>
  );
}
