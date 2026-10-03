import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BackgroundEffects } from './components/BackgroundEffects';
import { HeaderNav } from './components/HeaderNav';
import { NameGate } from './components/NameGate';
import { AccessDenied } from './components/AccessDenied';
import { AccessGranted } from './components/AccessGranted';
import { WelcomeScreen } from './components/WelcomeScreen';
import { DareReveal } from './components/DareReveal';
import { CompletionScreen } from './components/CompletionScreen';
import { soundManager } from './utils/sound';
import { AppStage } from './types/game';

const STORAGE_KEY = 'jewels_dare_session_v1';

interface SavedState {
  stage: AppStage;
  enteredName: string;
  isUnlocked: boolean;
  isBoxOpened: boolean;
  isDareCompleted: boolean;
}

export default function App() {
  const [stage, setStage] = useState<AppStage>('name_gate');
  const [enteredName, setEnteredName] = useState<string>('');
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [isBoxOpened, setIsBoxOpened] = useState<boolean>(false);
  const [isDareCompleted, setIsDareCompleted] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(!soundManager.getMuted());
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Restore state on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: SavedState = JSON.parse(saved);
        if (parsed.isUnlocked && parsed.enteredName.toLowerCase() === 'jannat') {
          setEnteredName(parsed.enteredName);
          setIsUnlocked(true);
          setIsBoxOpened(parsed.isBoxOpened);
          setIsDareCompleted(parsed.isDareCompleted);

          if (parsed.isDareCompleted) {
            setStage('completion');
          } else if (parsed.isBoxOpened) {
            setStage('dare_revealed');
          } else {
            setStage('welcome_screen');
          }
        }
      }
    } catch {
      // Ignore parse errors
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync state changes to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      const stateToSave: SavedState = {
        stage,
        enteredName,
        isUnlocked,
        isBoxOpened,
        isDareCompleted,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch {
      // Ignore storage errors
    }
  }, [stage, enteredName, isUnlocked, isBoxOpened, isDareCompleted, isHydrated]);

  const handleValidName = (name: string) => {
    setEnteredName(name);
    setIsUnlocked(true);
    setStage('access_granted');
  };

  const handleDeniedName = (name: string) => {
    setEnteredName(name);
    setStage('access_denied');
  };

  const handleRetryName = () => {
    setStage('name_gate');
  };

  const handleAccessGrantedComplete = () => {
    setStage('welcome_screen');
  };

  const handleBoxOpenComplete = () => {
    setIsBoxOpened(true);
    setStage('dare_revealed');
  };

  const handleDareCompleted = () => {
    setIsDareCompleted(true);
    setStage('completion');
  };

  const handleReviewDare = () => {
    setStage('dare_revealed');
  };

  const handleFullReset = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
    setEnteredName('');
    setIsUnlocked(false);
    setIsBoxOpened(false);
    setIsDareCompleted(false);
    setStage('name_gate');
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundManager.setMuted(!next);
    if (next) {
      soundManager.playClick();
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-rose-500/40 border-t-rose-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-[100dvh] w-full bg-[#080808] text-white flex flex-col justify-between overflow-x-hidden selection:bg-rose-500/30 selection:text-rose-200"
    >
      {/* Cinematic Ambient Background */}
      <BackgroundEffects />

      {/* Top Header Navigation */}
      <HeaderNav
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onReset={handleFullReset}
        showReset={isUnlocked}
      />

      {/* Main Experience Viewport */}
      <main className="relative z-10 w-full flex-1 flex flex-col items-center justify-center pb-safe">
        <AnimatePresence mode="wait">
          {stage === 'name_gate' && (
            <NameGate
              key="name_gate"
              onSubmitName={handleValidName}
              onDeny={handleDeniedName}
            />
          )}

          {stage === 'access_denied' && (
            <AccessDenied
              key="access_denied"
              onRetry={handleRetryName}
              deniedName={enteredName}
            />
          )}

          {stage === 'access_granted' && (
            <AccessGranted
              key="access_granted"
              onComplete={handleAccessGrantedComplete}
            />
          )}

          {stage === 'welcome_screen' && (
            <WelcomeScreen
              key="welcome_screen"
              onOpenBoxComplete={handleBoxOpenComplete}
              isOpened={isBoxOpened}
            />
          )}

          {stage === 'dare_revealed' && (
            <DareReveal
              key="dare_revealed"
              onCompleteDare={handleDareCompleted}
            />
          )}

          {stage === 'completion' && (
            <CompletionScreen
              key="completion"
              onReviewDare={handleReviewDare}
              onReset={handleFullReset}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Discreet footer text */}
      <footer className="w-full text-center py-3 z-10 relative pointer-events-none pb-safe">
        <p className="text-[11px] tracking-widest text-neutral-600 font-display">
          Crafted with care by Jewel
        </p>
      </footer>
    </motion.div>
  );
}
