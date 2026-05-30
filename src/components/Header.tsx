'use client';

import { Difficulty, GameMode, DIFFICULTY_CONFIG } from '@/types';

interface HeaderProps {
  difficulty: Difficulty | null;
  mode?: GameMode;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
  onChangeDifficulty: (d: Difficulty) => void;
  onShowStats: () => void;
}

const DIFFICULTIES: Difficulty[] = ['lehka', 'stredni', 'tezka'];

export function Header({
  difficulty,
  mode = 'daily',
  isSoundEnabled,
  onToggleSound,
  onChangeDifficulty,
  onShowStats,
}: HeaderProps) {
  return (
    <header className="w-full border-b border-border-default">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-white tracking-widest">SLOVBAL</h1>
          {difficulty && (
            <span className={`text-xs px-2 py-0.5 rounded font-medium ${
              mode === 'practice'
                ? 'bg-border-default text-text-secondary'
                : 'bg-tile-correct/20 text-tile-correct'
            }`}>
              {mode === 'practice' ? 'Procvičování' : 'Dnešní výzva'}
            </span>
          )}
        </div>

        {/* Difficulty selector (only shown when in game) */}
        {difficulty && (
          <div className="flex items-center gap-1">
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                onClick={() => onChangeDifficulty(d)}
                className={`
                  px-2 py-1 rounded text-xs font-medium transition-colors
                  ${
                    d === difficulty
                      ? 'bg-tile-correct text-white'
                      : 'text-text-secondary hover:text-white hover:bg-bg-secondary'
                  }
                `}
                aria-label={DIFFICULTY_CONFIG[d].label}
              >
                {DIFFICULTY_CONFIG[d].label.charAt(0)}
                <span className="hidden sm:inline">{DIFFICULTY_CONFIG[d].label.slice(1)}</span>
              </button>
            ))}
          </div>
        )}

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Stats button */}
          {difficulty && (
            <button
              onClick={onShowStats}
              className="text-text-secondary hover:text-white transition-colors p-2"
              aria-label="Statistiky"
              title="Statistiky"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.1h-15V5h15v14.1zm0-16.1h-15c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
              </svg>
            </button>
          )}

          {/* Sound toggle */}
          <button
            onClick={onToggleSound}
            className="text-text-secondary hover:text-white transition-colors p-2"
            aria-label={isSoundEnabled ? 'Vypnout zvuk' : 'Zapnout zvuk'}
            title={isSoundEnabled ? 'Vypnout zvuk' : 'Zapnout zvuk'}
          >
            {isSoundEnabled ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
