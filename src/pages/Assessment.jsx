import { useCallback, useEffect, useState } from "react";
import ProgressTracker from "../components/assessment/ProgressTracker";
import WelcomeScreen from "../components/assessment/WelcomeScreen";
import UserDetailsScreen from "../components/assessment/UserDetailsScreen";
import SectionScreen from "../components/assessment/SectionScreen";
import ReviewScreen from "../components/assessment/ReviewScreen";
import ResultsScreen from "../components/assessment/ResultsScreen";
import enableGLogo from "../assets/enableg-logo-transparent.png";

const STORAGE_KEY = "enableg_assessment";

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return null;
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export default function Assessment() {
  const saved = loadState();
  const [step, setStep] = useState(saved?.step || 0);
  const [answers, setAnswers] = useState(saved?.answers || {});
  const [details, setDetails] = useState(
    saved?.details || { date: new Date().toISOString().split("T")[0] }
  );

  useEffect(() => {
    saveState({ step, answers, details });
  }, [step, answers, details]);

  const handleAnswer = useCallback((questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const goToSection = (sectionIndex) => {
    setStep(sectionIndex + 2);
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setDetails({ date: new Date().toISOString().split("T")[0] });
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto py-8 sm:py-12">
        {step > 0 && step < 8 && (
          <div className="px-4 mb-8">
            <div className="mb-6 flex justify-start">
              <img
                src={enableGLogo}
                alt="Enable G Logo"
                className="h-11 sm:h-14 w-auto object-contain"
              />
            </div>
            <ProgressTracker currentStep={step} />
          </div>
        )}

        {step === 0 && <WelcomeScreen onStart={() => setStep(1)} />}
        {step === 1 && (
          <UserDetailsScreen
            details={details}
            onChange={setDetails}
            onNext={() => setStep(2)}
            onBack={() => setStep(0)}
          />
        )}
        {step >= 2 && step <= 5 && (
          <SectionScreen
            sectionIndex={step - 2}
            answers={answers}
            onAnswer={handleAnswer}
            onNext={() => setStep(step + 1)}
            onBack={() => setStep(step - 1)}
          />
        )}
        {step === 6 && (
          <ReviewScreen
            answers={answers}
            onSubmit={() => setStep(7)}
            onBack={() => setStep(5)}
            onGoToSection={goToSection}
          />
        )}
        {step === 7 && (
          <ResultsScreen
            answers={answers}
            details={details}
            onRestart={handleRestart}
          />
        )}
      </main>

      <footer className="border-t border-border py-6 mt-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground">
            <a
              href="https://www.EnableG.net"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              www.EnableG.net
            </a>
            <span className="mx-2">|</span>
            All responses are confidential
            <span className="mx-2">|</span>
            v1.0
          </p>
        </div>
      </footer>
    </div>
  );
}
