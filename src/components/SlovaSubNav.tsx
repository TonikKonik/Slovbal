'use client';

import { Difficulty, GameMode, DIFFICULTY_CONFIG } from '@/types';

const DIFFICULTIES: Difficulty[] = ['lehka', 'stredni', 'tezka'];

interface SlovaSubNavProps {
  difficulty: Difficulty;
  mode: GameMode;
  onChangeDifficulty: (d: Difficulty) => void;
  onShowStats: () => void;
}

export function SlovaSubNav({ difficulty, mode, onChangeDifficulty, onShowStats }: SlovaSubNavProps) {
  return (
    <div className="w-full border-b border-border-default bg-bg-primary">
      <div className="max-w-2xl mx-auto px-4 h-10 flex items-center justify-between">
        {/* Difficulty tabs */}
        <div className="flex items-center gap-1">
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              onClick={() => onChangeDifficulty(d)}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                d === difficulty
                  ? 'bg-tile-correct text-white'
                  : 'text-text-secondary hover:text-text-primary hover:bg-nav-active'
              }`}
            >
              {DIFFICULTY_CONFIG[d].label}
            </button>
          ))}
        </div>

        {/* Mode badge + stats */}
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            mode === 'practice'
              ? 'bg-border-default text-text-secondary'
              : 'bg-tile-correct/20 text-tile-correct'
          }`}>
            {mode === 'practice' ? 'Procvičování' : 'Dnešní výzva'}
          </span>
          <button
            onClick={onShowStats}
            className="text-text-secondary hover:text-text-primary transition-colors p-1"
            title="Statistiky"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.1h-15V5h15v14.1zm0-16.1h-15c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
