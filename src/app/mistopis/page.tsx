'use client';

import { useState, useCallback } from 'react';
import { GeoCategory, GEO_CATEGORIES, CATEGORY_LABELS } from '@/lib/geoWords';
import { useMistopis } from '@/hooks/useMistopis';
import { Keyboard } from '@/components/Keyboard';
import { TileState } from '@/types';

// ─── Sub-nav ─────────────────────────────────────────────────────────────────

function MistopisSubNav({ category, onChangeCategory }: {
  category: GeoCategory;
  onChangeCategory: (c: GeoCategory) => void;
}) {
  return (
    <div className="w-full border-b border-border-default bg-bg-primary">
      <div className="max-w-lg mx-auto px-4 h-10 flex items-center">
        <div className="flex items-center gap-1">
          {GEO_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => onChangeCategory(c)}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                c === category
                  ? 'bg-tile-correct text-white'
                  : 'text-text-secondary hover:text-text-primary hover:bg-nav-active'
              }`}
            >
              {CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Word display ─────────────────────────────────────────────────────────────

function WordDisplay({ word, guessedLetters }: { word: string; guessedLetters: string[] }) {
  const guessed = new Set(guessedLetters);
  const chars = word.split('');

  return (
    <div className="flex flex-wrap justify-center gap-1.5 px-2">
      {chars.map((char, i) => {
        if (char === ' ') {
          return <div key={i} className="w-4" />;
        }
        if (char === '-') {
          return (
            <div key={i} className="flex items-end justify-center w-5 pb-1">
              <span className="text-text-secondary font-bold text-lg">-</span>
            </div>
          );
        }
        const revealed = guessed.has(char);
        return (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded flex items-center justify-center text-lg font-bold uppercase border-2 transition-all ${
              revealed
                ? 'bg-tile-correct border-tile-correct text-white'
                : 'bg-bg-secondary border-border-default text-transparent'
            }`}>
              {revealed ? char : '_'}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Lives display ────────────────────────────────────────────────────────────

function LivesDisplay({ livesLeft, maxLives }: { livesLeft: number; maxLives: number }) {
  return (
    <div className="flex items-center gap-1 justify-center">
      {Array.from({ length: maxLives }, (_, i) => (
        <span key={i} className={`text-xl transition-all ${i < livesLeft ? 'opacity-100' : 'opacity-20 grayscale'}`}>
          ❤️
        </span>
      ))}
    </div>
  );
}

// ─── Category selector ────────────────────────────────────────────────────────

function CategorySelector({ onSelect }: { onSelect: (c: GeoCategory) => void }) {
  const descriptions: Record<GeoCategory, string> = {
    reky: 'Vltava, Labe, Ohře a další české řeky',
    mesta: 'Od Prahy po Znojmo — česká města',
    hory: 'Sněžka, Praděd, Lysá hora a vrcholy',
  };
  const emojis: Record<GeoCategory, string> = {
    reky: '🌊',
    mesta: '🏙️',
    hory: '⛰️',
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-8 px-4">
      <div className="text-center">
        <div className="text-5xl mb-3">🗺️</div>
        <h2 className="text-3xl font-bold text-text-primary">Místopis</h2>
        <p className="text-text-secondary mt-2 max-w-xs">
          Hádej česká místní jména písmeno po písmenu. Máš 7 pokusů než přijdeš o životy.
        </p>
      </div>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <p className="text-text-secondary text-xs uppercase tracking-widest text-center">Vyber kategorii</p>
        {GEO_CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => onSelect(c)}
            className="w-full py-4 rounded-xl border border-border-default bg-bg-secondary hover:border-border-filled transition-all"
          >
            <div className="text-text-primary font-bold text-lg">{emojis[c]} {CATEGORY_LABELS[c]}</div>
            <div className="text-text-secondary text-sm mt-0.5">{descriptions[c]}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Result overlay ───────────────────────────────────────────────────────────

function ResultOverlay({ status, word, onNext }: {
  status: 'won' | 'lost';
  word: string;
  onNext: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}>
      <div className="animate-modal-in bg-bg-secondary border border-border-default rounded-xl w-full max-w-xs p-6 text-center">
        <div className="text-4xl mb-3">{status === 'won' ? '🎉' : '😔'}</div>
        <h3 className="text-xl font-bold text-text-primary mb-1">
          {status === 'won' ? 'Správně!' : 'Bohužel!'}
        </h3>
        {status === 'lost' && (
          <p className="text-text-secondary text-sm mb-3">
            Správná odpověď: <span className="text-text-primary font-bold uppercase">{word}</span>
          </p>
        )}
        <button
          onClick={onNext}
          className="mt-4 w-full py-3 rounded-lg bg-tile-correct text-white font-bold hover:opacity-90 transition-opacity"
        >
          Další slovo →
        </button>
      </div>
    </div>
  );
}

// ─── Main game ────────────────────────────────────────────────────────────────

function MistopisGame({ category }: { category: GeoCategory }) {
  const { state, guessLetter, guessWholeWord, nextWord } = useMistopis(category);
  const { word, guessedLetters, livesLeft, maxLives, status } = state;

  const [wholeGuess, setWholeGuess] = useState('');
  const [wrongGuessFlash, setWrongGuessFlash] = useState(false);

  const handleKey = useCallback((key: string) => {
    if (key === 'ENTER' || key === '⌫' || key === 'BACKSPACE') return;
    if (status !== 'playing') return;
    guessLetter(key);
  }, [guessLetter, status]);

  const handleWholeGuess = () => {
    if (!wholeGuess.trim()) return;
    const correct = guessWholeWord(wholeGuess);
    setWholeGuess('');
    if (!correct) {
      setWrongGuessFlash(true);
      setTimeout(() => setWrongGuessFlash(false), 600);
    }
  };

  // Build letterStates for keyboard coloring
  const letterStates: Record<string, TileState> = {};
  const wordLetters = new Set(word.split('').filter(c => c !== ' ' && c !== '-'));
  guessedLetters.forEach(l => {
    letterStates[l.toLowerCase()] = wordLetters.has(l) ? 'correct' : 'absent';
  });

  const wrongLetters = guessedLetters.filter(l => !wordLetters.has(l));

  return (
    <div className="flex flex-col flex-1 min-h-0 max-w-lg mx-auto w-full overflow-hidden">
      {/* Stats bar */}
      <div className="flex items-center justify-between px-4 py-2">
        <LivesDisplay livesLeft={livesLeft} maxLives={maxLives} />
        {wrongLetters.length > 0 && (
          <div className="text-xs text-text-secondary">
            Špatně: <span className="text-red-400 font-bold uppercase">{wrongLetters.join(' ')}</span>
          </div>
        )}
      </div>

      {/* Word */}
      <div className={`flex-1 flex items-center justify-center px-2 ${wrongGuessFlash ? 'animate-shake' : ''}`}>
        <WordDisplay word={word} guessedLetters={guessedLetters} />
      </div>

      {/* Whole word guess input */}
      {status === 'playing' && (
        <div className="flex gap-2 px-4 pb-2">
          <input
            type="text"
            value={wholeGuess}
            onChange={e => setWholeGuess(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleWholeGuess(); }}
            placeholder="Tipni celé slovo…"
            className="flex-1 px-3 py-2 rounded-lg border border-border-default bg-bg-secondary text-text-primary placeholder:text-text-secondary text-sm focus:outline-none focus:border-border-filled"
          />
          <button
            onClick={handleWholeGuess}
            className="px-4 py-2 rounded-lg bg-tile-correct text-white font-bold text-sm hover:opacity-90 transition-opacity"
          >
            Tipni
          </button>
        </div>
      )}

      {/* Keyboard */}
      <Keyboard letterStates={letterStates} onKey={handleKey} />

      {/* Result overlay */}
      {(status === 'won' || status === 'lost') && (
        <ResultOverlay status={status} word={word} onNext={nextWord} />
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MistopisPage() {
  const [category, setCategory] = useState<GeoCategory | null>(null);

  if (!category) {
    return <CategorySelector onSelect={setCategory} />;
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <MistopisSubNav category={category} onChangeCategory={setCategory} />
      <MistopisGame key={category} category={category} />
    </div>
  );
}
