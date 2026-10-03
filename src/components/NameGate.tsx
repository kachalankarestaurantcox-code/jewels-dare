import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface NameGateProps {
  onSubmitName: (name: string) => void;
  onDeny: (name: string) => void;
}

export const NameGate: React.FC<NameGateProps> = ({ onSubmitName, onDeny }) => {
  const [name, setName] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [emptyError, setEmptyError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();

    if (!trimmed) {
      soundManager.playDeny();
      setEmptyError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    setEmptyError(false);

    // Case-insensitive check: only "jannat"
    if (trimmed.toLowerCase() === 'jannat') {
      soundManager.playClick();
      onSubmitName(trimmed);
    } else {
      soundManager.playDeny();
      onDeny(trimmed);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100dvh-90px)]"
    >
      {/* Central Glassmorphism Card */}
      <div className="w-full glass-panel-glow rounded-3xl p-7 sm:p-9 relative overflow-hidden backdrop-blur-2xl">
        {/* Subtle decorative top glow line */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-rose-500/60 to-transparent" />

        {/* Small floating romantic badge/icon */}
        <div className="flex justify-center mb-5">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-neutral-900/60 border border-rose-500/30 flex items-center justify-center shadow-lg shadow-rose-950/40">
              <Heart className="w-7 h-7 text-rose-500 fill-rose-500/30 animate-pulse" />
            </div>
            <Sparkles className="w-4 h-4 text-amber-400 absolute -top-1 -right-1 animate-bounce" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="text-center space-y-2 mb-7">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
            একটু থামুন... 👀
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base font-normal leading-relaxed">
            এই গেমটি খেলতে প্রথমে আপনার নাম লিখুন।
          </p>
        </div>

        {/* Name Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div
            animate={isShaking ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
            transition={{ duration: 0.45 }}
            className="relative"
          >
            <label htmlFor="user-name-input" className="sr-only">
              আপনার নাম
            </label>
            <input
              id="user-name-input"
              type="text"
              autoComplete="off"
              autoFocus
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (emptyError) setEmptyError(false);
              }}
              placeholder="আপনার নাম লিখুন..."
              className={`w-full h-13 px-4 py-3 text-base text-center bg-black/50 text-white placeholder-neutral-500 rounded-2xl border transition-all duration-300 outline-none focus:ring-2 ${
                emptyError
                  ? 'border-rose-500/80 focus:ring-rose-500/50'
                  : 'border-white/15 focus:border-rose-500/60 focus:ring-rose-500/30'
              }`}
            />
            {emptyError && (
              <p className="text-xs text-rose-400 text-center mt-2 font-medium">
                দয়া করে আগে আপনার নাম লিখুন!
              </p>
            )}
          </motion.div>

          <button
            type="submit"
            className="w-full h-13 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 hover:from-rose-500 hover:to-rose-500 text-white font-medium text-base tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-rose-900/40 active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <span>প্রবেশ করুন</span>
            <span className="text-rose-200">❤️</span>
          </button>
        </form>

        {/* Subtle footer hint */}
        <div className="mt-7 text-center">
          <p className="text-[11px] tracking-widest uppercase text-neutral-500 font-display">
            A Private Surprise · For Her Eyes Only
          </p>
        </div>
      </div>
    </motion.div>
  );
};
