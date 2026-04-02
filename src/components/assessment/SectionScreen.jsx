import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QUESTIONS, SECTIONS } from "../../lib/assessmentData";
import QuestionCard from "./QuestionCard";

export default function SectionScreen({
  sectionIndex,
  answers,
  onAnswer,
  onNext,
  onBack,
}) {
  const section = SECTIONS[sectionIndex];
  const sectionQuestions = QUESTIONS.filter((q) => q.section === section.id);
  const answeredCount = sectionQuestions.filter(
    (q) => answers[q.id] !== undefined
  ).length;
  const allAnswered = answeredCount === sectionQuestions.length;

  return (
    <motion.div
      key={section.id}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      className="max-w-2xl mx-auto px-4"
    >
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold mb-3">
          Section {section.id} of 4
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{section.title}</h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          {section.description}
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {sectionQuestions.map((q, i) => (
          <QuestionCard
            key={q.id}
            question={q}
            value={answers[q.id]}
            onChange={onAnswer}
            index={i}
          />
        ))}
      </div>

      <div className="flex items-center justify-center mb-6">
        <span className="text-xs text-muted-foreground font-medium">
          {answeredCount} of {sectionQuestions.length} answered
        </span>
      </div>

      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Previous
        </Button>
        <Button onClick={onNext} className="gap-2 px-6" disabled={!allAnswered}>
          {sectionIndex < 3 ? "Next Section" : "Review Answers"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
