'use client';

import { useState } from 'react';
import { Difficulty, DIFFICULTY_CONFIG } from '@/types';
import { useAnagram } from '@/hooks/useAnagram';

const DIFFICULTIES: Difficulty[] = ['lehka', 'stredni', 'tezka'];

// ─── Letter tile ────────────────────────────────────────────────────────────

function LetterTile({
  letter,
  onClick,
  variant = 'available',
  index = 0,
}: {
  letter: string | null;
  onClick?: () => void;
  variant?: 'available' | 'answer' | 'empty';
  index?: number;
}) {
  if (variant === 'empty') {
    return (
      <div className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-border-default rounded-lg flex items-center justify-center">
        <span className="text-border-default text-xs">_</span>
      </div>
    );
  }

  if (letter === null) {
    return (
      <div
        className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-dashed border-border-default rounded-lg opacity-30"
        style={{ animationDelay: `${index * 50}ms` }}
      />
    );
  }

  const base = 'w-12 h-12 sm:w-14 sm:h-14 rounded-lg border-2 flex items-center justify-center text-xl sm:text-2xl font-bold uppercase select-none cursor-pointer active:scale-95 transition-transform';

  if (variant === 'answer') {
    return (
      <button
        onClick={onClick}
        className={`${base} bg-tile-correct border-tile-correct text-white hover:opacity-80`}
        title="Klikni pro vrácení"
      >
        {letter}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${base} bg-bg-secondary border-border-filled text-text-primary hover:border-border-filled hover:bg-bg-primary`}
    >
      {letter}
    </button>
  );
}

// ─── Timer bar ───────────────────────────────────────────────────────────────

function TimerBar({ timeLeft, total }: { timeLeft: number; total: number }) {
  const pct = (timeLeft / total) * 100;
  const color = pct > 50 ? 'bg-tile-correct' : pct > 25 ? 'bg-tile-present' : 'bg-red-500';
  return (
    <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden">
      <div
        className={`h-full ${color} transition-all duration-1000 ease-linear`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ─── Difficulty selector ─────────────────────────────────────────────────────

function DifficultySelector({ onSelect }: { onSelect: (d: Difficulty) => void }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-8 px-4">
      <div className="text-center">
        <div className="text-5xl mb-3">🔀</div>
        <h2 className="text-3xl font-bold text-text-primary">Anagram</h2>
        <p className="text-text-secondary mt-2 max-w-xs">
          Zamíchané písmena — složíš slovo co nejrychleji. 5 kol, čím rychleji tím víc bodů.
        </p>
      </div>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <p className="text-text-secondary text-xs uppercase tracking-widest text-center">Vyber obtížnost</p>
        {DIFFICULTIES.map((d) => (
          <button
            key={d}
            onClick={() => onSelect(d)}
            className="w-full py-4 rounded-xl border border-border-default bg-bg-secondary hover:border-border-filled transition-all group"
          >
            <div className="text-text-primary font-bold text-lg">{DIFFICULTY_CONFIG[d].label}</div>
            <div className="text-text-secondary text-sm mt-0.5">
              {DIFFICULTY_CONFIG[d].letters} písmen · {
                d === 'lehka' ? '45 s' : d === 'stredni' ? '60 s' : '75 s'
              } na kolo
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Game over overlay ───────────────────────────────────────────────────────

function GameOverOverlay({
  score, round, status, word, onRestart, onChangeDifficulty,
}: {
  score: number; round: number; status: string; word: string;
  onRestart: () => void; onChangeDifficulty: () => void;
}) {
  const isTimeout = status === 'timeout';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
      <div className="animate-modal-in bg-bg-secondary border border-border-default rounded-xl w-full max-w-sm p-6 text-center">
        <div className="text-5xl mb-3">{status === 'gameover' ? '🏆' : '⏱️'}</div>
        <h2 className="text-2xl font-bold text-text-primary mb-1">
          {status === 'gameover' ? 'Hotovo!' : 'Čas vypršel!'}
        </h2>
        {isTimeout && (
          <p className="text-text-secondary text-sm mb-3">
            Slovo bylo: <span className="text-text-primary font-bold uppercase">{word}</span>
          </p>
        )}
        <div className="my-4">
          <span className="text-4xl font-bold text-tile-correct">{score}</span>
          <p className="text-text-secondary text-sm mt-1">bodů za {round - (isTimeout ? 1 : 0)} kol</p>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <button
            onClick={onRestart}
            className="w-full py-3 rounded-lg bg-tile-correct text-white font-bold hover:opacity-90 transition-opacity"
          >
            Hrát znovu
          </button>
          <button
            onClick={onChangeDifficulty}
            className="w-full py-3 rounded-lg border border-border-default text-text-secondary font-bold hover:text-text-primary hover:border-border-filled transition-colors"
          >
            Jiná obtížnost
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main game ───────────────────────────────────────────────────────────────

function AnagramGame({ difficulty, onChangeDifficulty }: { difficulty: Difficulty; onChangeDifficulty: () => void }) {
  const { state, selectLetter, unselectLetter, clearAnswer, reshuffleAvailable, nextRound, restart } = useAnagram(difficulty);
  const { word, available, answer, timeLeft, totalTime, score, round, totalRounds, status } = state;

  const answerComplete = answer.every((l) => l !== null);

  return (
    <div className="flex flex-col flex-1 min-h-0 max-w-lg mx-auto w-full px-4 py-3 gap-3">

      {/* Header row: score + round + timer */}
      <div className="flex items-center gap-3">
        <div className="flex-none text-center">
          <div className="text-lg font-bold text-tile-correct">{score}</div>
          <div className="text-xs text-text-secondary">bodů</div>
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex justify-between text-xs text-text-secondary">
            <span>Kolo {round}/{totalRounds}</span>
            <span className={timeLeft <= 10 ? 'text-red-400 font-bold' : ''}>{timeLeft}s</span>
          </div>
          <TimerBar timeLeft={timeLeft} total={totalTime} />
        </div>
      </div>

      {/* Answer slots */}
      <div className="flex justify-center gap-1.5 flex-wrap">
        {answer.map((letter, i) =>
          letter ? (
            <LetterTile key={i} letter={letter} variant="answer" onClick={() => unselectLetter(i)} />
          ) : (
            <LetterTile key={i} letter={null} variant="empty" />
          )
        )}
      </div>

      {/* Divider with word length hint */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-px bg-border-default" />
        <span className="text-xs text-text-secondary">{word.length} písmen</span>
        <div className="flex-1 h-px bg-border-default" />
      </div>

      {/* Available letters */}
      <div className="flex justify-center gap-1.5 flex-wrap">
        {available.map((letter, i) => (
          <LetterTile
            key={i}
            letter={letter}
            index={i}
            variant="available"
            onClick={() => selectLetter(i)}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-2 justify-center mt-auto">
        <button
          onClick={clearAnswer}
          className="px-4 py-2 rounded-lg border border-border-default text-text-secondary text-sm hover:text-text-primary hover:border-border-filled transition-colors"
        >
          Vymazat
        </button>
        <button
          onClick={reshuffleAvailable}
          className="px-4 py-2 rounded-lg border border-border-default text-text-secondary text-sm hover:text-text-primary hover:border-border-filled transition-colors"
        >
          Zamíchat
        </button>
      </div>

      {/* Wrong answer flash */}
      {answerComplete && answer.join('').toLowerCase() !== word && (
        <div className="text-center text-red-400 text-sm animate-fade-in">
          Zkus to jinak!
        </div>
      )}

      {/* Correct overlay (inline, not blocking) */}
      {status === 'correct' && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <div className="animate-modal-in bg-bg-secondary border border-border-default rounded-xl w-full max-w-xs p-6 text-center">
            <div className="text-4xl mb-2">✅</div>
            <h3 className="text-xl font-bold text-text-primary">
              <span className="uppercase">{word}</span>
            </h3>
            <p className="text-tile-correct mt-1 font-bold">
              +{timeLeft * 10 + word.length * 50} bodů
            </p>
            <p className="text-text-secondary text-sm mt-1">{timeLeft}s zbývalo</p>
            <button
              onClick={nextRound}
              className="mt-4 w-full py-3 rounded-lg bg-tile-correct text-white font-bold hover:opacity-90 transition-opacity"
            >
              Další slovo →
            </button>
          </div>
        </div>
      )}

      {/* Timeout / Game over */}
      {(status === 'timeout' || status === 'gameover') && (
        <GameOverOverlay
          score={score}
          round={round}
          status={status}
          word={word}
          onRestart={restart}
          onChangeDifficulty={onChangeDifficulty}
        />
      )}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AnagramPage() {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);

  if (!difficulty) {
    return <DifficultySelector onSelect={setDifficulty} />;
  }

  return (
    <AnagramGame
      difficulty={difficulty}
      onChangeDifficulty={() => setDifficulty(null)}
    />
  );
}
