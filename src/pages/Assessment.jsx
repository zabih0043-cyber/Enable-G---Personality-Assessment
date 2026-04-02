import { lazy, startTransition, Suspense, useCallback, useEffect, useState } from "react";
import WelcomeScreen from "../components/assessment/WelcomeScreen";
import enableGLogo from "../assets/enableg-logo-cropped.png";

const STORAGE_KEY = "enableg_assessment";
const ProgressTracker = lazy(() => import("../components/assessment/ProgressTracker"));
const UserDetailsScreen = lazy(() =>
  import("../components/assessment/UserDetailsScreen")
);
const SectionScreen = lazy(() => import("../components/assessment/SectionScreen"));
const ReviewScreen = lazy(() => import("../components/assessment/ReviewScreen"));
const ResultsScreen = lazy(() => import("../components/assessment/ResultsScreen"));

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

function getInitialState() {
  const saved = loadState();

  return {
    step: saved?.step || 0,
    answers: saved?.answers || {},
    details: saved?.details || { date: new Date().toISOString().split("T")[0] },
  };
}

function ScreenLoader() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
    </div>
  );
}

export default function Assessment() {
  const [initialState] = useState(getInitialState);
  const [step, setStep] = useState(initialState.step);
  const [answers, setAnswers] = useState(initialState.answers);
  const [details, setDetails] = useState(initialState.details);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      saveState({ step, answers, details });
    }, 150);

    return () => window.clearTimeout(timeoutId);
  }, [step, answers, details]);

  const handleAnswer = useCallback((questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const goToSection = (sectionIndex) => {
    startTransition(() => {
      setStep(sectionIndex + 2);
    });
  };

  const handleRestart = () => {
    startTransition(() => {
      setStep(0);
    });
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
                className="h-16 w-auto object-contain"
              />
            </div>
            <Suspense fallback={<ScreenLoader />}>
              <ProgressTracker currentStep={step} />
            </Suspense>
          </div>
        )}

        {step === 0 && <WelcomeScreen onStart={() => setStep(1)} />}
        <Suspense fallback={<ScreenLoader />}>
          {step === 1 && (
            <UserDetailsScreen
              details={details}
              onChange={setDetails}
              onNext={() => {
                startTransition(() => {
                  setStep(2);
                });
              }}
              onBack={() => {
                startTransition(() => {
                  setStep(0);
                });
              }}
            />
          )}
          {step >= 2 && step <= 5 && (
            <SectionScreen
              sectionIndex={step - 2}
              answers={answers}
              onAnswer={handleAnswer}
              onNext={() => {
                startTransition(() => {
                  setStep(step + 1);
                });
              }}
              onBack={() => {
                startTransition(() => {
                  setStep(step - 1);
                });
              }}
            />
          )}
          {step === 6 && (
            <ReviewScreen
              answers={answers}
              onSubmit={() => {
                startTransition(() => {
                  setStep(7);
                });
              }}
              onBack={() => {
                startTransition(() => {
                  setStep(5);
                });
              }}
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
        </Suspense>
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
