"use client";

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export function ProgressBar({ current, total, className = "" }: ProgressBarProps) {
  const percentage = total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 0;

  return (
    <div className={`w-full max-w-md mx-auto space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
        <span>
          Kartu {total > 0 ? current : 0} dari {total}
        </span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700/60">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
