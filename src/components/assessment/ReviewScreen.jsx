import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft, CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ANSWER_OPTIONS, QUESTIONS, SECTIONS } from "../../lib/assessmentData";

export default function ReviewScreen({
  answers,
  onAnswer,
  onSubmit,
  onBack,
  onGoToSection,
}) {
  const unansweredQuestions = QUESTIONS.filter((q) => answers[q.id] === undefined);
  const allAnswered = unansweredQuestions.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-2xl mx-auto px-4"
    >
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Review Your Answers
        </h2>
        <p className="text-sm text-muted-foreground">
          Check your responses before submitting. You can edit any answer below.
        </p>
      </div>

      {!allAnswered && (
        <div className="bg-warning/10 border border-warning/30 rounded-xl p-4 flex items-start gap-3 mb-6">
          <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-foreground">
              {unansweredQuestions.length} unanswered{" "}
              {unansweredQuestions.length === 1 ? "question" : "questions"}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Please answer all questions before submitting.
            </p>
          </div>
        </div>
      )}

      {allAnswered && (
        <div className="bg-success/10 border border-success/30 rounded-xl p-4 flex items-start gap-3 mb-6">
          <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-foreground">
              All questions answered
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              You're ready to submit and view your results.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-6 mb-8">
        {SECTIONS.map((section) => {
          const sectionQuestions = QUESTIONS.filter((q) => q.section === section.id);
          return (
            <div
              key={section.id}
              className="bg-card rounded-xl border border-border p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-foreground">{section.title}</h3>
                <button
                  onClick={() => onGoToSection(section.id - 1)}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Edit Section
                </button>
              </div>
              <div className="space-y-3">
                {sectionQuestions.map((q) => {
                  const answered = answers[q.id] !== undefined;
                  const selectedLabel = answered
                    ? ANSWER_OPTIONS.find((o) => o.value === answers[q.id])?.label
                    : null;

                  return (
                    <div
                      key={q.id}
                      className={cn(
                        "flex items-start justify-between gap-3 py-2 border-b border-border/50 last:border-0",
                        !answered && "bg-warning/5 -mx-2 px-2 rounded-lg"
                      )}
                    >
                      <div className="flex items-start gap-2 flex-1 min-w-0">
                        <span className="text-[11px] font-bold text-muted-foreground mt-0.5 flex-shrink-0">
                          Q{q.id}
                        </span>
                        <p className="text-xs text-foreground leading-relaxed">
                          {q.text}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "text-[11px] font-semibold flex-shrink-0 px-2 py-1 rounded-md",
                          answered
                            ? "bg-accent text-accent-foreground"
                            : "bg-warning/20 text-warning-foreground"
                        )}
                      >
                        {answered ? selectedLabel : "Unanswered"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <Button
          onClick={onSubmit}
          disabled={!allAnswered}
          className="gap-2 px-6 shadow-lg"
          size="lg"
        >
          Submit Assessment
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
