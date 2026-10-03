import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Lock, MessageCircle, Eye, X, ArrowRight, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/sound';

interface CompletionScreenProps {
  onReviewDare: () => void;
  onReset: () => void;
}

const WHATSAPP_NUMBER = '01950608105';
const WHATSAPP_INTERNATIONAL = '8801950608105';
const REDIRECT_SECONDS = 12;

export const CompletionScreen: React.FC<CompletionScreenProps> = ({ onReviewDare, onReset }) => {
  const [showLockedModal, setShowLockedModal] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    // Launch celebratory heart & particle burst on mount
    try {
      const end = Date.now() + 1.2 * 1000;
      const colors = ['#e11d48', '#fda4af', '#f59e0b', '#22c55e', '#ffffff'];

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } catch {
      // Ignore
    }
  }, []);

  // Auto redirect countdown timer to return to name entry page
  useEffect(() => {
    if (secondsRemaining <= 0) {
      soundManager.playClick();
      onReset();
      return;
    }

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsRemaining, onReset]);

  const handleNextDareClick = () => {
    soundManager.playDeny();
    setShowLockedModal(true);
  };

  const whatsappMessage = encodeURIComponent(
    'জুয়েল, আমি ডেয়ার সম্পন্ন করেছি! এই নাও কল হিস্টোরির স্ক্রিনশট 😌❤️'
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_INTERNATIONAL}?text=${whatsappMessage}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-lg mx-auto px-4 py-4 flex flex-col items-center justify-center min-h-[calc(100dvh-80px)] text-center"
    >
      <div className="w-full glass-panel-glow rounded-3xl p-6 sm:p-9 relative overflow-hidden backdrop-blur-2xl border-rose-500/30 shadow-2xl shadow-rose-950/50">
        {/* Celebration Heart Icon */}
        <div className="flex justify-center mb-5">
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-rose-500/25 via-neutral-900 to-black border border-rose-500/40 flex items-center justify-center shadow-xl shadow-rose-950/60"
          >
            <Heart className="w-10 h-10 text-rose-500 fill-rose-500" />
            <Sparkles className="w-5 h-5 text-amber-300 absolute -top-1 -right-1 animate-spin" style={{ animationDuration: '6s' }} />
          </motion.div>
        </div>

        {/* Primary Celebratory Messages */}
        <div className="space-y-3 mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
            ওয়াও! ডেয়ার সম্পন্ন! 😌❤️
          </h2>
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 max-w-sm mx-auto">
            <p className="text-base sm:text-lg text-rose-300 font-medium leading-relaxed flex items-center justify-center gap-2">
              <span>জুয়েলকে প্রমাণ পাঠাতে ভুলবেন না।</span>
              <span className="text-xl">👀</span>
            </p>
            <p className="text-xs text-neutral-400 mt-2">
              (৫ মিনিটের কল হিস্টোরির স্ক্রিনশট হোয়াটসঅ্যাপে পাঠাবেন)
            </p>
          </div>
        </div>

        {/* Prominent WhatsApp Action Card with Number 01950608105 */}
        <div className="max-w-sm mx-auto mb-6">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playClick()}
            className="group w-full p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-neutral-900 to-emerald-950/80 border border-emerald-500/40 hover:border-emerald-400/70 transition-all duration-300 shadow-lg shadow-emerald-950/40 flex items-center justify-between gap-3 active:scale-[0.98]"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-sm group-hover:scale-105 transition-transform">
                <MessageCircle className="w-6 h-6 fill-emerald-500/20" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                  জুয়েলের হোয়াটসঅ্যাপ
                </p>
                <p className="text-xs text-emerald-400 font-mono font-medium tracking-wider">
                  {WHATSAPP_NUMBER}
                </p>
              </div>
            </div>
            <div className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-emerald-600 group-hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 shadow-md shadow-emerald-950/50 transition-colors whitespace-nowrap">
              <span>মেসেজ দিন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </a>
        </div>

        {/* Auto-redirect progress banner */}
        <div className="max-w-sm mx-auto mb-6 p-3.5 rounded-2xl bg-neutral-900/70 border border-white/10 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs text-neutral-300 font-medium">
            <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span>স্বয়ংক্রিয়ভাবে প্রচ্ছদে ফিরে যাওয়া হচ্ছে:</span>
            <span className="text-amber-400 font-bold font-mono text-sm px-1.5 py-0.5 rounded bg-black/50 border border-amber-500/20">
              {secondsRemaining}s
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 rounded-full bg-neutral-800 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-rose-500 via-amber-400 to-rose-500"
              initial={{ width: '100%' }}
              animate={{ width: `${(secondsRemaining / REDIRECT_SECONDS) * 100}%` }}
              transition={{ duration: 1, ease: 'linear' }}
            />
          </div>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onReset();
            }}
            className="text-[11px] text-neutral-400 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
          >
            অপেক্ষা না করে এখনই প্রচ্ছদে ফিরুন
          </button>
        </div>

        {/* Secondary Actions */}
        <div className="space-y-3 max-w-sm mx-auto">
          {/* Question / Next Dare */}
          <div className="pt-1 pb-1">
            <span className="text-xs font-medium text-neutral-400">
              পরবর্তী ডেয়ার?
            </span>
          </div>

          <button
            type="button"
            onClick={handleNextDareClick}
            className="w-full h-12 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-500 text-neutral-950 font-semibold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <span>আবার খেলবো</span>
            <span>😈</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onReviewDare();
            }}
            className="w-full h-11 rounded-2xl bg-white/10 hover:bg-white/15 text-neutral-200 font-medium text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 border border-white/10 active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-neutral-400" />
            <span>ডেয়ার কার্ডটি আবার দেখুন</span>
          </button>
        </div>
      </div>

      {/* Next Dare Locked Modal / View */}
      <AnimatePresence>
        {showLockedModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md px-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-sm glass-panel rounded-3xl p-6 relative text-center border-amber-500/30 shadow-2xl shadow-amber-950/50"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setShowLockedModal(false);
                }}
                className="absolute top-4 right-4 min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-400 hover:text-white"
                aria-label="বন্ধ করুন"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Locked Box Animation */}
              <motion.div
                animate={{
                  rotate: [0, -8, 8, -6, 6, 0],
                  scale: [1, 1.08, 1],
                }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="w-16 h-16 mx-auto rounded-2xl bg-neutral-900 border border-amber-500/40 flex items-center justify-center shadow-lg shadow-amber-950/40 mb-4"
              >
                <Lock className="w-7 h-7 text-amber-400 stroke-[2.2]" />
              </motion.div>

              <h3 className="text-lg font-bold text-white mb-2 font-display">
                Locked Secret
              </h3>

              <p className="text-base text-neutral-200 leading-relaxed font-semibold my-4">
                “পরবর্তী ডেয়ার এখনো লক করা আছে... 👀”
              </p>

              <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
                আগের ডেয়ারের প্রমাণ জুয়েলের হোয়াটসঅ্যাপে ({WHATSAPP_NUMBER}) সফলভাবে পৌঁছানোর পর পরবর্তী সারপ্রাইজ আনলক হবে! 😌
              </p>

              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setShowLockedModal(false);
                }}
                className="w-full h-11 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-sm transition-all border border-white/15"
              >
                ঠিক আছে, বুঝলাম ❤️
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
