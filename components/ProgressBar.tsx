"use client";

interface ProgressBarProps {
  value: number;
  color?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export function ProgressBar({
  value,
  color = "#3b82f6",
  showLabel = false,
  size = "md",
}: ProgressBarProps) {
  const heights = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  return (
    <div className="w-full">
      <div className={`w-full bg-slate-700 rounded-full overflow-hidden ${heights[size]}`}>
        <div
          className={`${heights[size]} rounded-full progress-bar transition-all duration-500`}
          style={{
            width: `${Math.min(100, Math.max(0, value))}%`,
            background: `linear-gradient(90deg, ${color}, ${color}cc)`,
          }}
        />
      </div>
      {showLabel && (
        <p className="text-sm text-slate-400 mt-1">{Math.round(value)}%</p>
      )}
    </div>
  );
}
