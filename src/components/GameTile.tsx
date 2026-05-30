'use client';

import { TileState } from '@/types';

interface GameTileProps {
  letter: string;
  state: TileState;
  isRevealing?: boolean;
  revealDelay?: number;
}

const STATE_CLASSES: Record<TileState, string> = {
  empty: 'border-2 border-border-default bg-bg-primary text-text-primary',
  filled: 'border-2 border-border-filled bg-bg-primary text-text-primary',
  correct: 'border-2 border-tile-correct bg-tile-correct text-white',
  present: 'border-2 border-tile-present bg-tile-present text-white',
  absent: 'border-2 border-tile-absent bg-tile-absent text-white',
};

export function GameTile({ letter, state, isRevealing, revealDelay = 0 }: GameTileProps) {
  const isRevealed = state === 'correct' || state === 'present' || state === 'absent';
  const isAnimating = isRevealing && isRevealed;

  return (
    <div className="tile-perspective w-full h-full">
      <div
        className={`
          flex items-center justify-center
          w-full h-full
          text-2xl font-bold uppercase
          select-none
          transition-colors
          ${STATE_CLASSES[state]}
          ${isAnimating ? 'tile-flip' : ''}
          ${state === 'filled' && letter ? 'animate-pop' : ''}
        `}
        style={{
          animationDelay: isAnimating ? `${revealDelay}ms` : undefined,
        }}
      >
        {letter}
      </div>
    </div>
  );
}
