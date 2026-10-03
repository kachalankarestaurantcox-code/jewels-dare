import React from 'react';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface HeaderNavProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onReset: () => void;
  showReset?: boolean;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  soundEnabled,
  onToggleSound,
  onReset,
  showReset = true,
}) => {
  return (
    <header className="w-full max-w-xl mx-auto flex items-center justify-between px-5 pt-4 pb-2 z-20 relative select-none">
      {/* Brand title - single text element as per design constitution */}
      <div className="flex items-center gap-2">
        <span className="font-display text-sm tracking-[0.25em] uppercase text-neutral-300 font-semibold drop-shadow-sm">
          Jewel’s Dare
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80 animate-pulse" />
      </div>

      {/* Action controls */}
      <div className="flex items-center gap-2">
        {showReset && (
          <button
            onClick={() => {
              soundManager.playClick();
              if (window.confirm('আপনি কি আবার শুরু থেকে খেলতে চান?')) {
                onReset();
              }
            }}
            title="পুনরায় শুরু করুন"
            aria-label="পুনরায় শুরু করুন"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-400 hover:text-white transition-colors duration-200 active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={onToggleSound}
          title={soundEnabled ? 'সাউন্ড বন্ধ করুন' : 'সাউন্ড চালু করুন'}
          aria-label={soundEnabled ? 'সাউন্ড বন্ধ করুন' : 'সাউন্ড চালু করুন'}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-400 hover:text-white transition-colors duration-200 active:scale-95"
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-rose-400" />
          ) : (
            <VolumeX className="w-4 h-4 text-neutral-500" />
          )}
        </button>
      </div>
    </header>
  );
};
