'use client';

import { GameState, Stats, Difficulty, DIFFICULTY_CONFIG } from '@/types';

interface ModalProps {
  gameState: GameState;
  stats: Stats;
  difficulty: Difficulty;
  onClose: () => void;
  onNewGame: (difficulty?: Difficulty) => void;
}

const DIFFICULTIES: Difficulty[] = ['lehka', 'stredni', 'tezka'];

const WIN_MESSAGES = [
  'Úžasné!', 'Skvělé!', 'Výborně!', 'Dobře!', 'Správně!', 'Fajn!', 'Uff, tak tak!',
];

function StatBox({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl font-bold text-white">{value}</span>
      <span className="text-xs text-text-secondary text-center mt-1">{label}</span>
    </div>
  );
}

function DistributionBar({
  tries,
  count,
  maxCount,
  isHighlighted,
}: {
  tries: number;
  count: number;
  maxCount: number;
  isHighlighted: boolean;
}) {
  const width = maxCount > 0 ? Math.max((count / maxCount) * 100, count > 0 ? 8 : 0) : 0;

  return (
    <div className="flex items-center gap-2 w-full">
      <span className="text-text-secondary text-sm w-3 text-right">{tries}</span>
      <div className="flex-1 h-5 bg-bg-secondary rounded overflow-hidden">
        <div
          className={`h-full flex items-center justify-end pr-2 text-xs font-bold text-white rounded transition-all duration-500 ${
            isHighlighted ? 'bg-tile-correct' : 'bg-key-absent'
          }`}
          style={{ width: `${width}%` }}
        >
          {count > 0 ? count : ''}
        </div>
      </div>
    </div>
  );
}

export function Modal({ gameState, stats, difficulty, onClose, onNewGame }: ModalProps) {
  const config = DIFFICULTY_CONFIG[difficulty];
  const isWon = gameState.gameStatus === 'won';
  const triesUsed = isWon ? gameState.currentRow : config.tries;

  const winMessage = isWon ? WIN_MESSAGES[Math.min(triesUsed - 1, WIN_MESSAGES.length - 1)] : '';

  const maxDistCount = Math.max(...Object.values(stats.distribution));

  const winRate = stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="animate-modal-in bg-bg-secondary border border-border-default rounded-xl w-full max-w-sm p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-secondary hover:text-white transition-colors text-xl"
          aria-label="Zavřít"
        >
          ✕
        </button>

        {/* Result */}
        <div className="text-center mb-6">
          {isWon ? (
            <>
              <div className="text-4xl mb-2">🎉</div>
              <h2 className="text-2xl font-bold text-white">{winMessage}</h2>
              <p className="text-text-secondary mt-1">
                Uhodl jsi za {triesUsed} {triesUsed === 1 ? 'pokus' : triesUsed < 5 ? 'pokusy' : 'pokusů'}
              </p>
            </>
          ) : (
            <>
              <div className="text-4xl mb-2">😔</div>
              <h2 className="text-2xl font-bold text-white">Příště lépe!</h2>
              <p className="text-text-secondary mt-1">
                Slovo bylo:{' '}
                <span className="text-white font-bold uppercase">{gameState.solution}</span>
              </p>
            </>
          )}
        </div>

        {/* Stats */}
        <div className="mb-6">
          <h3 className="text-text-secondary text-xs uppercase tracking-wider text-center mb-3">
            Statistiky
          </h3>
          <div className="grid grid-cols-4 gap-2 mb-4">
            <StatBox label="Odehráno" value={stats.played} />
            <StatBox label="Výhry %" value={winRate} />
            <StatBox label="Série" value={stats.streak} />
            <StatBox label="Max série" value={stats.maxStreak} />
          </div>
        </div>

        {/* Distribution */}
        <div className="mb-6">
          <h3 className="text-text-secondary text-xs uppercase tracking-wider text-center mb-3">
            Rozdělení pokusů
          </h3>
          <div className="flex flex-col gap-1">
            {Array.from({ length: config.tries }, (_, i) => i + 1).map((n) => (
              <DistributionBar
                key={n}
                tries={n}
                count={stats.distribution[n] || 0}
                maxCount={maxDistCount}
                isHighlighted={isWon && triesUsed === n}
              />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <h3 className="text-text-secondary text-xs uppercase tracking-wider text-center">
            Hrát znovu
          </h3>
          <div className="flex gap-2">
            {DIFFICULTIES.map((diff) => (
              <button
                key={diff}
                onClick={() => onNewGame(diff)}
                className={`flex-1 py-3 rounded-lg font-bold text-sm transition-colors ${
                  diff === difficulty
                    ? 'bg-tile-correct text-white'
                    : 'bg-bg-primary text-text-secondary hover:bg-border-default hover:text-white border border-border-default'
                }`}
              >
                {DIFFICULTY_CONFIG[diff].label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
