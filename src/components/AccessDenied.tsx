import React from 'react';
import { motion } from 'motion/react';
import { Lock, AlertCircle, ArrowLeft } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface AccessDeniedProps {
  onRetry: () => void;
  deniedName?: string;
}

export const AccessDenied: React.FC<AccessDeniedProps> = ({ onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100dvh-90px)]"
    >
      <div className="w-full glass-panel rounded-3xl p-7 sm:p-9 relative overflow-hidden text-center border-red-500/20 shadow-2xl shadow-red-950/30">
        {/* Animated Lock Icon */}
        <motion.div
          animate={{
            rotate: [0, -10, 10, -8, 8, -4, 4, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 0.8,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 2.5,
          }}
          className="w-20 h-20 mx-auto rounded-3xl bg-neutral-900/80 border border-red-500/30 flex items-center justify-center shadow-lg shadow-red-950/40 mb-6"
        >
          <Lock className="w-9 h-9 text-rose-500 stroke-[2.2]" />
        </motion.div>

        {/* Title */}
        <div className="space-y-1 mb-4">
          <p className="text-xs uppercase tracking-[0.2em] font-display text-rose-400/90 font-medium">
            Restricted Entry
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center justify-center gap-2 font-display">
            Access Denied 🔒
          </h2>
        </div>

        {/* Message */}
        <div className="my-5 p-4 rounded-2xl bg-black/40 border border-white/5">
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-normal">
            “দুঃখিত এই নামের কেউ জুয়েলের সাথে এই গেম টি খেলতে পারবে না”
          </p>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-400 mb-7">
          <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
          <span>অনুমতি শুধুমাত্র নির্দিষ্ট ব্যক্তির জন্য নির্ধারিত</span>
        </div>

        {/* Retry Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onRetry();
          }}
          className="w-full h-13 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-medium text-base tracking-wide flex items-center justify-center gap-2 border border-white/15 active:scale-[0.98] transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-neutral-400" />
          <span>আবার চেষ্টা করুন</span>
        </button>
      </div>
    </motion.div>
  );
};
