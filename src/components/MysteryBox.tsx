import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Unlock, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface MysteryBoxProps {
  onOpenComplete: () => void;
  isOpened?: boolean;
}

type BoxAnimationPhase = 'idle' | 'pressing' | 'shaking' | 'unlocking' | 'lid_opening' | 'opened';

export const MysteryBox: React.FC<MysteryBoxProps> = ({ onOpenComplete, isOpened = false }) => {
  const [phase, setPhase] = useState<BoxAnimationPhase>(isOpened ? 'opened' : 'idle');
  const [softFlash, setSoftFlash] = useState(false);

  const handleBoxClick = () => {
    if (phase !== 'idle') return;

    // 1. Button/card slightly moves
    setPhase('pressing');
    soundManager.playClick();

    // 2. Lock begins glowing & 3. Small vibration/shake animation
    setTimeout(() => {
      setPhase('shaking');
      soundManager.playBoxShake();
    }, 280);

    // 4. Lock opens
    setTimeout(() => {
      setPhase('unlocking');
      soundManager.playUnlock();
    }, 950);

    // 5. Box lid slowly opens & 6. Bright light emerges & 7. Particles rise
    setTimeout(() => {
      setPhase('lid_opening');
      soundManager.playLidOpenShimmer();
    }, 1500);

    // 8. Screen briefly flashes softly & 9. Dare card emerges
    setTimeout(() => {
      setSoftFlash(true);
      setTimeout(() => setSoftFlash(false), 350);
    }, 2400);

    setTimeout(() => {
      setPhase('opened');
      onOpenComplete();
    }, 2650);
  };

  const isInteracting = phase !== 'idle' && phase !== 'opened';

  return (
    <div className="relative flex flex-col items-center justify-center my-4 select-none">
      {/* Soft screen flash during reveal */}
      <AnimatePresence>
        {softFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 bg-amber-100/30 pointer-events-none backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      {/* Floating Sparkles around the box */}
      <div className="absolute -top-6 -left-4 pointer-events-none">
        <Sparkles className="w-5 h-5 text-amber-400/80 animate-pulse" />
      </div>
      <div className="absolute -bottom-2 -right-4 pointer-events-none">
        <Sparkles className="w-4 h-4 text-rose-400/70 animate-bounce" />
      </div>

      {/* Box Container Button */}
      <motion.button
        type="button"
        disabled={isInteracting || phase === 'opened'}
        onClick={handleBoxClick}
        animate={
          phase === 'idle'
            ? { y: [0, -7, 0] }
            : phase === 'pressing'
            ? { scale: 0.94, y: 4 }
            : phase === 'shaking'
            ? {
                x: [-4, 5, -4, 4, -2, 2, 0],
                y: [0, -2, 2, -1, 1, 0],
                rotate: [-1.5, 1.5, -1, 1, 0],
              }
            : phase === 'unlocking'
            ? { scale: 1.02 }
            : phase === 'lid_opening'
            ? { scale: 1.05 }
            : { scale: 1 }
        }
        transition={
          phase === 'idle'
            ? { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
            : phase === 'shaking'
            ? { duration: 0.65, ease: 'easeInOut' }
            : { duration: 0.3 }
        }
        whileHover={phase === 'idle' ? { scale: 1.03 } : {}}
        whileTap={phase === 'idle' ? { scale: 0.96 } : {}}
        className={`group relative w-64 sm:w-72 h-56 sm:h-64 rounded-3xl p-4 flex flex-col items-center justify-end cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 ${
          phase === 'opened' ? 'opacity-80 pointer-events-none' : ''
        }`}
        aria-label="আপনার ডেয়ার বক্সটি খুলুন"
      >
        {/* Soft Golden & Crimson Glow Halo */}
        <div
          className={`absolute inset-0 rounded-3xl transition-all duration-700 pointer-events-none ${
            phase === 'idle'
              ? 'bg-gradient-to-t from-amber-500/10 via-rose-500/10 to-transparent blur-xl group-hover:from-amber-500/20 group-hover:via-rose-500/20'
              : phase === 'shaking' || phase === 'unlocking'
              ? 'bg-gradient-to-t from-amber-500/35 via-rose-500/25 to-amber-300/30 blur-2xl scale-110'
              : phase === 'lid_opening'
              ? 'bg-gradient-to-t from-amber-400/60 via-amber-200/50 to-white/60 blur-3xl scale-125'
              : 'opacity-0'
          }`}
        />

        {/* 3D Box Illustration / Construct */}
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          {/* Inner Light Beams when lid opens */}
          {phase === 'lid_opening' && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="absolute -top-16 w-44 h-48 bg-gradient-to-t from-amber-100/90 via-amber-300/50 to-transparent blur-lg origin-bottom pointer-events-none z-30"
            />
          )}

          {/* Floating Rising Particles during opening */}
          {(phase === 'lid_opening' || phase === 'unlocking') && (
            <div className="absolute inset-0 pointer-events-none z-40 overflow-visible">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30, x: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: -90 - Math.random() * 60,
                    x: (Math.random() - 0.5) * 80,
                  }}
                  transition={{
                    duration: 1 + Math.random() * 0.6,
                    delay: i * 0.08,
                    ease: 'easeOut',
                  }}
                  className="absolute left-1/2 bottom-1/2 w-2 h-2 rounded-full bg-amber-200 shadow-md shadow-amber-400"
                />
              ))}
            </div>
          )}

          {/* BOX LID */}
          <motion.div
            animate={
              phase === 'lid_opening' || phase === 'opened'
                ? {
                    y: -50,
                    rotateX: -55,
                    scale: 0.95,
                    opacity: 0.7,
                  }
                : phase === 'unlocking'
                ? { y: -5 }
                : { y: 0, rotateX: 0 }
            }
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'top center' }}
            className="w-48 sm:w-56 h-18 sm:h-20 rounded-t-2xl relative z-20 flex items-center justify-center border-t border-x border-amber-500/30 shadow-xl"
          >
            {/* Lid Material gradient: obsidian charcoal with gold bevel */}
            <div className="absolute inset-0 rounded-t-2xl bg-gradient-to-b from-[#222226] via-[#161618] to-[#0d0d0f]" />
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-amber-500/30 via-amber-200/80 to-amber-500/30" />

            {/* Vertical ribbon across lid */}
            <div className="absolute inset-y-0 w-8 bg-gradient-to-r from-rose-800 via-rose-600 to-rose-800 border-x border-amber-400/40 shadow-sm" />

            {/* Lid Trim / Edge */}
            <div className="absolute bottom-0 inset-x-0 h-2 bg-gradient-to-r from-neutral-800 via-amber-700/60 to-neutral-800 border-t border-amber-500/30" />

            {/* Small decorative gem/crest on lid */}
            <div className="relative z-10 w-5 h-5 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 border border-amber-200/80 shadow-md shadow-amber-900/50 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
            </div>
          </motion.div>

          {/* BOX BODY */}
          <div className="w-48 sm:w-56 h-28 sm:h-32 rounded-b-2xl relative z-10 -mt-1 flex flex-col items-center justify-between border-b border-x border-amber-500/30 shadow-2xl">
            {/* Box Body Texture */}
            <div className="absolute inset-0 rounded-b-2xl bg-gradient-to-b from-[#18181b] via-[#101013] to-[#08080a] shadow-inner" />

            {/* Vertical crimson-gold ribbon */}
            <div className="absolute inset-y-0 w-8 bg-gradient-to-r from-rose-800 via-rose-600 to-rose-800 border-x border-amber-400/40 shadow-md" />

            {/* Horizontal gold accent bar */}
            <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 h-4 bg-gradient-to-r from-neutral-800 via-amber-900/50 to-neutral-800 border-y border-amber-500/20" />

            {/* Golden Corner Brackets */}
            <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-amber-400/60 rounded-bl-md" />
            <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-amber-400/60 rounded-br-md" />

            {/* Centered Golden Padlock / Seal */}
            <div className="relative z-30 my-auto flex flex-col items-center">
              <motion.div
                animate={
                  phase === 'shaking'
                    ? { rotate: [-12, 12, -8, 8, 0], scale: [1, 1.15, 1] }
                    : phase === 'unlocking'
                    ? { y: [-3, -8, -4], scale: 1.15 }
                    : { rotate: 0 }
                }
                transition={{ duration: 0.4 }}
                className={`relative w-12 h-14 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                  phase === 'unlocking' || phase === 'lid_opening' || phase === 'opened'
                    ? 'bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 border-amber-100 shadow-lg shadow-amber-300/60'
                    : 'bg-gradient-to-b from-amber-400 via-amber-500 to-amber-700 border-amber-300/80 shadow-md shadow-amber-950/70 group-hover:shadow-amber-500/40'
                }`}
              >
                {/* Shackle */}
                {phase === 'unlocking' || phase === 'lid_opening' || phase === 'opened' ? (
                  <Unlock className="w-6 h-6 text-neutral-900 stroke-[2.4]" />
                ) : (
                  <Lock className="w-6 h-6 text-neutral-900 stroke-[2.4]" />
                )}

                {/* Lock glow pulse */}
                {(phase === 'shaking' || phase === 'unlocking') && (
                  <span className="absolute -inset-1 rounded-xl bg-amber-400/50 blur-sm animate-ping pointer-events-none" />
                )}
              </motion.div>
            </div>

            {/* Bottom brand plate / OPEN ME prompt */}
            <div className="relative z-20 pb-2 text-center">
              <span className="font-display text-[10px] tracking-[0.25em] uppercase text-amber-200/90 font-bold drop-shadow">
                {phase === 'opened' ? 'UNLOCKED' : 'OPEN ME'}
              </span>
            </div>
          </div>
        </div>

        {/* Ambient shadow beneath box */}
        <div className="w-40 sm:w-48 h-4 rounded-full bg-black/80 blur-md -mt-2 pointer-events-none" />
      </motion.button>

      {/* Subtext Prompt below box */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-3 text-center"
      >
        <p className="text-xs sm:text-sm text-neutral-400 font-medium tracking-wide flex items-center justify-center gap-1.5">
          <span>আপনার ডেয়ার এখানে লুকানো আছে</span>
          <span className="text-amber-400">👀</span>
        </p>
        {phase === 'idle' && (
          <p className="text-[11px] text-neutral-500 mt-1 font-normal animate-pulse">
            (বক্সটিতে স্পর্শ করুন)
          </p>
        )}
      </motion.div>
    </div>
  );
};
