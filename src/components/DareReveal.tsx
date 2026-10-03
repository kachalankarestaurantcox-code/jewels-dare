import React from 'react';
import { motion } from 'motion/react';
import { Heart, PhoneCall, Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface DareRevealProps {
  onCompleteDare: () => void;
}

const WHATSAPP_NUMBER = '01950608105';
const WHATSAPP_INTERNATIONAL = '8801950608105';

export const DareReveal: React.FC<DareRevealProps> = ({ onCompleteDare }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 25 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-lg mx-auto px-4 py-4 flex flex-col items-center justify-center min-h-[calc(100dvh-80px)] text-center"
    >
      {/* Revealed Glass Card */}
      <div className="w-full glass-panel-glow rounded-3xl p-7 sm:p-9 relative overflow-hidden backdrop-blur-2xl border-rose-500/25 shadow-2xl shadow-rose-950/40">
        {/* Soft top ambient light */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-80" />

        {/* Ambient floating heart / icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500/20 via-neutral-900 to-black border border-rose-500/40 flex items-center justify-center shadow-lg shadow-rose-950/50"
            >
              <PhoneCall className="w-8 h-8 text-rose-400 stroke-[2]" />
            </motion.div>
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500 absolute -top-1 -right-2 animate-bounce" />
            <Sparkles className="w-4 h-4 text-amber-300 absolute -bottom-1 -left-2" />
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-widest text-white uppercase drop-shadow-sm flex items-center justify-center gap-2">
            YOUR DARE <span className="text-rose-500 fill-rose-500">❤️</span>
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-rose-500/60 to-transparent mx-auto mt-2" />
        </div>

        {/* Dare Content Box */}
        <div className="bg-black/55 rounded-2xl p-6 sm:p-7 border border-white/10 shadow-inner mb-6 space-y-3">
          <p className="text-lg sm:text-xl font-semibold text-white leading-relaxed sm:leading-loose text-balance">
            “এখনই আপনার আম্মুকে কল দিয়ে কমপক্ষে ৫ মিনিট কথা বলবেন।
          </p>
          <p className="text-base sm:text-lg font-medium text-rose-300/90 leading-relaxed">
            স্ক্রিনশট জুয়েলের হোয়াটসঅ্যাপে দিবেন।”
          </p>
          <div className="pt-2 flex items-center justify-center">
            <a
              href={`https://wa.me/${WHATSAPP_INTERNATIONAL}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium hover:bg-emerald-500/25 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp: {WHATSAPP_NUMBER}</span>
            </a>
          </div>
        </div>

        {/* Playful small line */}
        <div className="mb-7 flex items-center justify-center gap-1.5 text-neutral-300 text-sm sm:text-base font-medium">
          <span>“ডেয়ার কিন্তু ডেয়ারই... 😌”</span>
        </div>

        {/* Completion Button */}
        <button
          type="button"
          onClick={() => {
            soundManager.playCelebration();
            onCompleteDare();
          }}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 hover:from-rose-500 hover:to-rose-500 text-white font-medium text-base sm:text-lg tracking-wide flex items-center justify-center gap-2.5 shadow-xl shadow-rose-950/60 active:scale-[0.98] transition-all duration-200 cursor-pointer border border-rose-400/30"
        >
          <CheckCircle2 className="w-5 h-5 text-white/90" />
          <span>ডেয়ার সম্পন্ন করেছি</span>
          <span className="text-rose-200">❤️</span>
        </button>
      </div>
    </motion.div>
  );
};
