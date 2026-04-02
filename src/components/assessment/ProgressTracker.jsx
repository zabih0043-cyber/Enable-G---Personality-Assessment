import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 0, label: "Welcome" },
  { id: 1, label: "Details" },
  { id: 2, label: "Section 1" },
  { id: 3, label: "Section 2" },
  { id: 4, label: "Section 3" },
  { id: 5, label: "Section 4" },
  { id: 6, label: "Review" },
  { id: 7, label: "Results" },
];

export default function ProgressTracker({ currentStep }) {
  const progress = (currentStep / (STEPS.length - 1)) * 100;

  return (
    <div className="w-full px-2">
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground">
            {STEPS[currentStep]?.label}
          </span>
          <span className="text-xs font-medium text-primary">
            {currentStep}/{STEPS.length - 1}
          </span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="hidden md:flex items-center justify-between relative">
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-muted" />
        <motion.div
          className="absolute top-4 left-0 h-0.5 bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        {STEPS.map((step) => {
          const isComplete = currentStep > step.id;
          const isCurrent = currentStep === step.id;

          return (
            <div key={step.id} className="flex flex-col items-center relative z-10">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300",
                  isComplete && "bg-primary text-primary-foreground",
                  isCurrent &&
                    "bg-primary text-primary-foreground ring-4 ring-accent",
                  !isComplete && !isCurrent &&
                    "bg-muted text-muted-foreground"
                )}
              >
                {isComplete ? <Check className="h-4 w-4" /> : step.id + 1}
              </div>
              <span
                className={cn(
                  "text-[10px] mt-1.5 font-medium transition-colors",
                  isCurrent ? "text-primary" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
