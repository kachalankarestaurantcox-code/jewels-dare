import React from 'react';
import { motion } from 'motion/react';
import { MysteryBox } from './MysteryBox';

interface WelcomeScreenProps {
  onOpenBoxComplete: () => void;
  isOpened?: boolean;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onOpenBoxComplete,
  isOpened = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-lg mx-auto px-4 py-4 flex flex-col items-center justify-center min-h-[calc(100dvh-80px)] text-center"
    >
      {/* Welcome Card Container */}
      <div className="w-full glass-panel-glow rounded-3xl p-6 sm:p-8 flex flex-col items-center relative overflow-hidden backdrop-blur-2xl">
        {/* Subtle top ambient crimson bar */}
        <div className="absolute top-0 inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-rose-500/50 to-transparent" />

        {/* Bengali Welcome Message */}
        <div className="space-y-3 mb-6 max-w-md mx-auto">
          <h1 className="text-xl sm:text-2xl font-bold leading-relaxed sm:leading-loose text-white text-balance">
            জুয়েলের{' '}
            <span className="text-rose-400 font-extrabold drop-shadow-[0_0_12px_rgba(244,63,94,0.6)]">
              ডেয়ারে
            </span>{' '}
            আপনাকে স্বাগতম{' '}
            <span className="text-rose-400 font-extrabold underline decoration-rose-500/40 underline-offset-4 drop-shadow-[0_0_12px_rgba(244,63,94,0.6)]">
              জান্নাত
            </span>
            ।
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
            আপনি ইতিমধ্যে ডেয়ার সিলেক্ট করেছেন।
          </p>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
            আপনার ডেয়ার দেখতে নিচের বক্সটি খুলুন।
          </p>
        </div>

        {/* Mystery Box Visual Centerpiece */}
        <MysteryBox onOpenComplete={onOpenBoxComplete} isOpened={isOpened} />
      </div>
    </motion.div>
  );
};
