'use client';

import { useState, useEffect } from 'react';
import { GameState, Stats, Difficulty, GameMode, DIFFICULTY_CONFIG } from '@/types';

interface ModalProps {
  gameState: GameState;
  stats: Stats;
  difficulty: Difficulty;
  mode: GameMode;
  onClose: () => void;
  onNewGame: (difficulty: Difficulty, mode: GameMode) => void;
}

const DIFFICULTIES: Difficulty[] = ['lehka', 'stredni', 'tezka'];
const GAME_STATE_PREFIX = 'slovbal-game-';

const WIN_MESSAGES = [
  'Úžasné!', 'Skvělé!', 'Výborně!', 'Dobře!', 'Správně!', 'Fajn!', 'Uff, tak tak!',
];

function getTodayString() {
  return new Date().toISOString().slice(0, 10);
}

function isDifficultyPlayedToday(diff: Difficulty): boolean {
  try {
    const stored = localStorage.getItem(GAME_STATE_PREFIX + diff);
    if (!stored) return false;
    const parsed = JSON.parse(stored);
    return parsed.date === getTodayString() && parsed.gameStatus !== 'playing';
  } catch {
    return false;
  }
}

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState('');
  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);
  return timeLeft;
}

function StatBox({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl font-bold text-text-primary">{value}</span>
      <span className="text-xs text-text-secondary text-center mt-1">{label}</span>
    </div>
  );
}

function DistributionBar({ tries, count, maxCount, isHighlighted }: {
  tries: number; count: number; maxCount: number; isHighlighted: boolean;
}) {
  const width = maxCount > 0 ? Math.max((count / maxCount) * 100, count > 0 ? 8 : 0) : 0;
  return (
    <div className="flex items-center gap-2 w-full">
      <span className="text-text-secondary text-sm w-3 text-right">{tries}</span>
      <div className="flex-1 h-5 bg-bg-secondary rounded overflow-hidden">
        <div
          className={`h-full flex items-center justify-end pr-2 text-xs font-bold text-white rounded transition-all duration-500 ${isHighlighted ? 'bg-tile-correct' : 'bg-key-absent'}`}
          style={{ width: `${width}%` }}
        >
          {count > 0 ? count : ''}
        </div>
      </div>
    </div>
  );
}

export function Modal({ gameState, stats, difficulty, mode, onClose, onNewGame }: ModalProps) {
  const config = DIFFICULTY_CONFIG[difficulty];
  const isWon = gameState.gameStatus === 'won';
  const isPractice = mode === 'practice';
  const triesUsed = isWon ? gameState.currentRow : config.tries;
  const winMessage = isWon ? WIN_MESSAGES[Math.min(triesUsed - 1, WIN_MESSAGES.length - 1)] : '';
  const maxDistCount = Math.max(...Object.values(stats.distribution));
  const winRate = stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0;
  const timeLeft = useCountdown();

  const unplayedDailyDifficulties = DIFFICULTIES.filter(
    (d) => d !== difficulty && !isDifficultyPlayedToday(d)
  );
  const allDailyPlayed = DIFFICULTIES.every(isDifficultyPlayedToday);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="animate-modal-in bg-bg-secondary border border-border-default rounded-xl w-full max-w-sm p-6 relative overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors text-xl" aria-label="Zavřít">✕</button>

        {/* Mode badge */}
        {isPractice && (
          <div className="text-center mb-2">
            <span className="text-xs bg-border-default text-text-secondary px-2 py-1 rounded-full uppercase tracking-wider">Procvičování</span>
          </div>
        )}

        {/* Result */}
        <div className="text-center mb-5">
          {isWon ? (
            <>
              <div className="text-4xl mb-2">🎉</div>
              <h2 className="text-2xl font-bold text-text-primary">{winMessage}</h2>
              <p className="text-text-secondary mt-1">
                Uhodl jsi za {triesUsed} {triesUsed === 1 ? 'pokus' : triesUsed < 5 ? 'pokusy' : 'pokusů'}
              </p>
            </>
          ) : (
            <>
              <div className="text-4xl mb-2">😔</div>
              <h2 className="text-2xl font-bold text-text-primary">Příště lépe!</h2>
              <p className="text-text-secondary mt-1">
                Slovo bylo: <span className="text-text-primary font-bold uppercase">{gameState.solution}</span>
              </p>
            </>
          )}
        </div>

        {/* Stats - only for daily mode */}
        {!isPractice && (
          <div className="mb-5">
            <h3 className="text-text-secondary text-xs uppercase tracking-wider text-center mb-3">Statistiky denní výzvy</h3>
            <div className="grid grid-cols-4 gap-2 mb-3">
              <StatBox label="Odehráno" value={stats.played} />
              <StatBox label="Výhry %" value={winRate} />
              <StatBox label="Série" value={stats.streak} />
              <StatBox label="Max série" value={stats.maxStreak} />
            </div>
            <div className="flex flex-col gap-1">
              {Array.from({ length: config.tries }, (_, i) => i + 1).map((n) => (
                <DistributionBar key={n} tries={n} count={stats.distribution[n] || 0} maxCount={maxDistCount} isHighlighted={isWon && triesUsed === n} />
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3">
          {/* Practice: play again */}
          {isPractice && (
            <button
              onClick={() => onNewGame(difficulty, 'practice')}
              className="w-full py-3 rounded-lg font-bold text-sm bg-tile-correct text-white hover:opacity-90 transition-opacity"
            >
              Nové náhodné slovo
            </button>
          )}

          {/* Practice: switch to daily */}
          {isPractice && unplayedDailyDifficulties.length > 0 && (
            <div className="flex flex-col gap-2">
              <h3 className="text-text-secondary text-xs uppercase tracking-wider text-center">Denní výzva</h3>
              <div className="flex gap-2">
                {unplayedDailyDifficulties.map((diff) => (
                  <button key={diff} onClick={() => onNewGame(diff, 'daily')}
                    className="flex-1 py-3 rounded-lg font-bold text-sm bg-bg-primary text-text-secondary hover:bg-border-default hover:text-text-primary border border-border-default transition-colors">
                    {DIFFICULTY_CONFIG[diff].label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Daily: other difficulties + practice */}
          {!isPractice && (
            <>
              {unplayedDailyDifficulties.length > 0 && (
                <div className="flex flex-col gap-2">
                  <h3 className="text-text-secondary text-xs uppercase tracking-wider text-center">Denní výzva – jiná obtížnost</h3>
                  <div className="flex gap-2">
                    {unplayedDailyDifficulties.map((diff) => (
                      <button key={diff} onClick={() => onNewGame(diff, 'daily')}
                        className="flex-1 py-3 rounded-lg font-bold text-sm bg-tile-correct text-white hover:opacity-90 transition-opacity">
                        {DIFFICULTY_CONFIG[diff].label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {allDailyPlayed && (
                <div className="text-center py-1">
                  <p className="text-text-secondary text-xs">Nová denní slova za</p>
                  <p className="text-text-primary text-2xl font-bold font-mono mt-1">{timeLeft}</p>
                </div>
              )}

              <div className="border-t border-border-default pt-3">
                <button
                  onClick={() => onNewGame(difficulty, 'practice')}
                  className="w-full py-3 rounded-lg font-bold text-sm bg-bg-primary text-text-secondary hover:bg-border-default hover:text-text-primary border border-border-default transition-colors"
                >
                  Procvičovat (náhodné slovo)
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
