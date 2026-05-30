'use client';

import { useState, useEffect, useCallback } from 'react';
import { Difficulty, DIFFICULTY_CONFIG } from '@/types';
import { useGame } from '@/hooks/useGame';
import { useSound } from '@/hooks/useSound';
import { GameBoard } from '@/components/GameBoard';
import { Keyboard } from '@/components/Keyboard';
import { SlovaSubNav } from '@/components/SlovaSubNav';
import { Modal } from '@/components/Modal';

const DIFFICULTY_STORAGE_KEY = 'slovbal-difficulty';

function DifficultySelector({ onSelect }: { onSelect: (d: Difficulty) => void }) {
  const difficulties: Difficulty[] = ['lehka', 'stredni', 'tezka'];

  const colors: Record<Difficulty, string> = {
    lehka: 'border-tile-correct hover:bg-tile-correct',
    stredni: 'border-tile-present hover:bg-tile-present',
    tezka: 'border-red-500 hover:bg-red-500',
  };

  const icons: Record<Difficulty, string> = {
    lehka: '🟢',
    stredni: '🟡',
    tezka: '🔴',
  };

  const descriptions: Record<Difficulty, string> = {
    lehka: '4 písmena · 7 pokusů',
    stredni: '5 písmen · 6 pokusů',
    tezka: '6 písmen · 5 pokusů',
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold text-white tracking-widest mb-3">SLOVBAL</h1>
        <p className="text-text-secondary text-lg">Česká hra na hádání slov</p>
      </div>

      <div className="w-full max-w-sm space-y-4">
        <h2 className="text-text-secondary text-center text-sm uppercase tracking-widest mb-6">
          Vyber obtížnost
        </h2>
        {difficulties.map((d) => (
          <button
            key={d}
            onClick={() => onSelect(d)}
            className={`
              w-full py-5 px-6 rounded-xl border-2 text-left
              transition-all duration-200
              ${colors[d]}
              hover:text-white
              text-white
              group
            `}
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">{icons[d]}</span>
              <div>
                <div className="text-xl font-bold">{DIFFICULTY_CONFIG[d].label}</div>
                <div className="text-sm text-text-secondary group-hover:text-white/80 transition-colors">
                  {descriptions[d]}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Toast({ message }: { message: string }) {
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
      <div className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
        {message}
      </div>
    </div>
  );
}

export default function Home() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  // Restore last difficulty from localStorage
  useEffect(() => {
    setHasMounted(true);
    const stored = localStorage.getItem(DIFFICULTY_STORAGE_KEY);
    if (stored && ['lehka', 'stredni', 'tezka'].includes(stored)) {
      setSelectedDifficulty(stored as Difficulty);
    }
  }, []);

  const { isSoundEnabled, toggleSound, playClick, playWhoosh, playFanfare, playError } = useSound();

  const handleWin = useCallback(() => {
    playFanfare();
  }, [playFanfare]);

  const handleError = useCallback(() => {
    playError();
  }, [playError]);

  const handleReveal = useCallback(() => {
    playWhoosh();
  }, [playWhoosh]);

  const {
    gameState,
    difficulty,
    mode,
    isLoading,
    isShaking,
    revealingRow,
    showModal,
    toastMessage,
    stats,
    handleKey,
    dismissModal,
    resetGame,
  } = useGame(
    selectedDifficulty || 'stredni',
    handleWin,
    handleError,
    handleReveal
  );

  const handleKeyPress = useCallback(
    (key: string) => {
      if (key !== 'ENTER' && key !== '⌫' && key !== 'BACKSPACE') {
        playClick();
      }
      handleKey(key);
    },
    [handleKey, playClick]
  );

  // Physical keyboard listener
  useEffect(() => {
    if (!selectedDifficulty) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      const key = e.key;
      if (key === 'Backspace' || key === 'Delete') {
        handleKeyPress('BACKSPACE');
        return;
      }
      if (key === 'Enter') {
        handleKeyPress('ENTER');
        return;
      }

      // Czech and standard Latin characters
      const czechChar = /^[a-záčďéěíňóřšťůúýža-z]$/i;
      if (czechChar.test(key) && key.length === 1) {
        handleKeyPress(key.toUpperCase());
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedDifficulty, handleKeyPress]);

  const handleSelectDifficulty = (d: Difficulty) => {
    localStorage.setItem(DIFFICULTY_STORAGE_KEY, d);
    setSelectedDifficulty(d);
    resetGame(d, 'daily');
  };

  const handleChangeDifficulty = (d: Difficulty) => {
    localStorage.setItem(DIFFICULTY_STORAGE_KEY, d);
    setSelectedDifficulty(d);
    resetGame(d, 'daily');
  };

  const handleShowStats = () => { /* modal opens via showModal state */ };

  // Don't render until mounted (avoid SSR/localStorage mismatch)
  if (!hasMounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-text-secondary">Načítám...</div>
      </div>
    );
  }

  if (!selectedDifficulty) {
    return <DifficultySelector onSelect={handleSelectDifficulty} />;
  }

  return (
    <div className="flex flex-col flex-1 min-h-0 max-w-2xl mx-auto w-full">
      <SlovaSubNav
        difficulty={difficulty}
        mode={mode}
        onChangeDifficulty={handleChangeDifficulty}
        onShowStats={handleShowStats}
      />

      {/* Toast */}
      {toastMessage && <Toast message={toastMessage} />}

      {/* Loading state */}
      {isLoading ? (
        <div className="flex items-center justify-center flex-1">
          <div className="text-text-secondary animate-pulse">Načítám slovo...</div>
        </div>
      ) : (
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 min-h-0 flex items-center justify-center">
            <GameBoard
              gameState={gameState}
              difficulty={difficulty}
              isShaking={isShaking}
              revealingRow={revealingRow}
            />
          </div>
          <Keyboard letterStates={gameState.letterStates} onKey={handleKeyPress} />
        </div>
      )}

      {/* Win/Lose modal */}
      {showModal && (
        <Modal
          gameState={gameState}
          stats={stats}
          difficulty={difficulty}
          mode={mode}
          onClose={dismissModal}
          onNewGame={(d, m) => {
            localStorage.setItem(DIFFICULTY_STORAGE_KEY, d);
            setSelectedDifficulty(d);
            resetGame(d, m);
            dismissModal();
          }}
        />
      )}
    </div>
  );
}
