import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/sound';

interface AccessGrantedProps {
  onComplete: () => void;
}

export const AccessGranted: React.FC<AccessGrantedProps> = ({ onComplete }) => {
  useEffect(() => {
    soundManager.playAccessGranted();

    // Subtle gentle heart/crimson particle burst
    try {
      confetti({
        particleCount: 28,
        spread: 60,
        origin: { y: 0.55 },
        colors: ['#e11d48', '#fda4af', '#f59e0b', '#ffffff'],
        ticks: 120,
        gravity: 0.8,
        scalar: 0.9,
      });
    } catch {
      // Ignore
    }

    const timer = setTimeout(() => {
      onComplete();
    }, 1300);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md px-4"
    >
      {/* Soft pulse glow behind heart */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [0.9, 1.2, 1], opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative flex items-center justify-center mb-6"
      >
        <div className="absolute w-40 h-40 rounded-full bg-rose-600/30 blur-2xl" />
        <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-rose-500/25 to-black/80 border border-rose-500/40 flex items-center justify-center shadow-2xl shadow-rose-900/60">
          <Heart className="w-12 h-12 text-rose-500 fill-rose-500 animate-pulse" />
          <Sparkles className="w-5 h-5 text-amber-300 absolute -top-1 -right-1" />
        </div>
      </motion.div>

      {/* Access Granted Message */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="text-center space-y-2"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white font-display tracking-wide drop-shadow-md">
          Access Granted <span className="text-rose-500">❤️</span>
        </h2>
        <p className="text-sm text-neutral-400 font-bengali">
          স্বাগতম জান্নাত...
        </p>
      </motion.div>
    </motion.div>
  );
};
