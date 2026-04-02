import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AGE_RANGES = ["Under 18", "18–24", "25–34", "35–44", "45–54", "55+"];
const OCCUPATIONS = ["Student", "Professional", "Self-Employed", "Other"];

export default function UserDetailsScreen({
  details,
  onChange,
  onNext,
  onBack,
}) {
  const updateField = (field, value) => {
    onChange({ ...details, [field]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      className="max-w-md mx-auto px-4"
    >
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">About You</h2>
        <p className="text-sm text-muted-foreground">
          These details are optional and help personalise your experience.
        </p>
      </div>

      <div className="space-y-5 bg-card rounded-xl border border-border p-6 shadow-sm">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Full Name
          </Label>
          <Input
            id="name"
            placeholder="Your name"
            value={details.name || ""}
            onChange={(e) => updateField("name", e.target.value)}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date" className="text-sm font-medium">
            Date
          </Label>
          <Input
            id="date"
            type="date"
            value={details.date || new Date().toISOString().split("T")[0]}
            onChange={(e) => updateField("date", e.target.value)}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Age Range</Label>
          <Select
            value={details.ageRange || ""}
            onValueChange={(v) => updateField("ageRange", v)}
          >
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select age range" />
            </SelectTrigger>
            <SelectContent>
              {AGE_RANGES.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Occupation</Label>
          <Select
            value={details.occupation || ""}
            onValueChange={(v) => updateField("occupation", v)}
          >
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select occupation" />
            </SelectTrigger>
            <SelectContent>
              {OCCUPATIONS.map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between mt-8">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <Button onClick={onNext} className="gap-2 px-6">
          Continue <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
