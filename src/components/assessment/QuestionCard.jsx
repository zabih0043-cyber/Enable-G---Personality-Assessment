import { motion } from "framer-motion";
import { ANSWER_OPTIONS } from "../../lib/assessmentData";
import { cn } from "@/lib/utils";

export default function QuestionCard({ question, value, onChange, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className="bg-card rounded-xl border border-border p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-3 mb-4">
        <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold">
          {question.id}
        </span>
        <p className="text-sm sm:text-base font-medium text-foreground leading-relaxed pt-0.5">
          {question.text}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-1.5">
        {ANSWER_OPTIONS.map((option) => {
          const isSelected = value === option.value;

          return (
            <button
              key={option.value}
              onClick={() => onChange(question.id, option.value)}
              className={cn(
                "flex-1 px-3 py-2.5 sm:py-2 rounded-lg text-xs sm:text-[11px] font-semibold transition-all duration-200 border-2",
                isSelected
                  ? "bg-primary text-primary-foreground border-primary shadow-md scale-[1.02]"
                  : "bg-background text-muted-foreground border-transparent hover:border-primary/30 hover:text-foreground"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
