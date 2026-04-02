import { motion } from "framer-motion";
import {
  Lightbulb,
  RotateCcw,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  calculateSectionScore,
  calculateTotalScore,
  getOverallDescription,
  getOverallLabel,
  getSectionLabel,
  SECTION_RECOMMENDATIONS,
  SECTIONS,
} from "../../lib/assessmentData";
import RadarChartSection from "./RadarChartSection";
import ScoreGauge from "./ScoreGauge";

export default function ResultsScreen({ answers, details, onRestart }) {
  const totalResult = calculateTotalScore(answers);
  const overallLabel = getOverallLabel(totalResult.total);
  const overallDesc = getOverallDescription(totalResult.total);

  const sectionResults = SECTIONS.map((s) => {
    const result = calculateSectionScore(answers, s.id);
    return { ...s, ...result, label: getSectionLabel(result.total) };
  });

  const sorted = [...sectionResults].sort((a, b) => b.total - a.total);
  const strengths = sorted.slice(0, 2);
  const growthAreas = sorted.slice(-2).reverse();

  const recommendations = [];
  sectionResults.forEach((s) => {
    const recs = SECTION_RECOMMENDATIONS[s.id];
    if (s.total <= 15) {
      recommendations.push(...recs.low.map((r) => ({ section: s.title, text: r })));
    } else {
      recommendations.push(
        ...recs.high.slice(0, 1).map((r) => ({ section: s.title, text: r }))
      );
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto px-4"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
            Your Results
          </h2>
          {details?.name && (
            <p className="text-sm text-muted-foreground mb-4">{details.name}</p>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm mb-6 text-center"
      >
        <ScoreGauge score={totalResult.total} max={totalResult.max} />
        <div className="mt-4">
          <span className="inline-block bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-bold">
            {overallLabel}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-4 max-w-md mx-auto leading-relaxed">
          {overallDesc}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
      >
        {sectionResults.map((s) => (
          <div
            key={s.id}
            className="bg-card rounded-xl border border-border p-4 text-center shadow-sm"
          >
            <ScoreGauge score={s.total} max={25} size="small" />
            <p className="text-xs font-bold text-foreground mt-2 leading-tight">
              {s.title}
            </p>
            <span
              className={cn(
                "inline-block text-[10px] font-semibold mt-1 px-2 py-0.5 rounded-full",
                s.total >= 21 && "bg-success/15 text-success",
                s.total >= 16 && s.total < 21 && "bg-primary/15 text-primary",
                s.total >= 11 && s.total < 16 && "bg-warning/15 text-warning",
                s.total < 11 && "bg-destructive/15 text-destructive"
              )}
            >
              {s.label}
            </span>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="bg-card rounded-2xl border border-border p-6 shadow-sm mb-6"
      >
        <h3 className="text-sm font-bold text-foreground mb-4 text-center">
          Profile Overview
        </h3>
        <RadarChartSection sectionResults={sectionResults} />
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="bg-card rounded-xl border border-border p-5 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-success" />
            <h3 className="text-sm font-bold text-foreground">Your Strengths</h3>
          </div>
          <div className="space-y-2">
            {strengths.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between bg-success/5 rounded-lg p-3"
              >
                <span className="text-xs font-medium text-foreground">{s.title}</span>
                <span className="text-xs font-bold text-success">{s.total}/25</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-card rounded-xl border border-border p-5 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className="h-4 w-4 text-warning" />
            <h3 className="text-sm font-bold text-foreground">Growth Areas</h3>
          </div>
          <div className="space-y-2">
            {growthAreas.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between bg-warning/5 rounded-lg p-3"
              >
                <span className="text-xs font-medium text-foreground">{s.title}</span>
                <span className="text-xs font-bold text-warning">{s.total}/25</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-card rounded-2xl border border-border p-6 shadow-sm mb-8"
      >
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-bold text-foreground">
            Personalised Recommendations
          </h3>
        </div>
        <div className="space-y-3">
          {recommendations.map((rec, i) => (
            <div
              key={i}
              className="flex items-start gap-3 py-2 border-b border-border/50 last:border-0"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-0.5">
                  {rec.section}
                </p>
                <p className="text-sm text-foreground leading-relaxed">{rec.text}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
        <Button variant="outline" onClick={onRestart} className="gap-2">
          <RotateCcw className="h-4 w-4" /> Retake Assessment
        </Button>
      </div>
    </motion.div>
  );
}
