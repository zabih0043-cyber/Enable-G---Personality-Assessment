import { motion } from "framer-motion";

export default function ScoreGauge({ score, max, label, size = "large" }) {
  const percentage = Math.round((score / max) * 100);
  const isLarge = size === "large";
  const circumference = 2 * Math.PI * (isLarge ? 54 : 36);
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${isLarge ? "w-32 h-32" : "w-20 h-20"}`}>
        <svg
          className="w-full h-full -rotate-90"
          viewBox={isLarge ? "0 0 120 120" : "0 0 80 80"}
        >
          <circle
            cx={isLarge ? 60 : 40}
            cy={isLarge ? 60 : 40}
            r={isLarge ? 54 : 36}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={isLarge ? 8 : 6}
          />
          <motion.circle
            cx={isLarge ? 60 : 40}
            cy={isLarge ? 60 : 40}
            r={isLarge ? 54 : 36}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth={isLarge ? 8 : 6}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`font-bold text-foreground ${isLarge ? "text-2xl" : "text-base"}`}
          >
            {score}
          </span>
          <span
            className={`text-muted-foreground ${isLarge ? "text-xs" : "text-[10px]"}`}
          >
            /{max}
          </span>
        </div>
      </div>
      {label && <span className="text-xs font-semibold text-primary mt-2">{label}</span>}
    </div>
  );
}
