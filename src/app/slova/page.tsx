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

const DIFFICULTIES: Difficulty[] = ['lehka', 'stredni', 'tezka'];

function DifficultySelector({ onSelect }: { onSelect: (d: Difficulty) => void }) {
  const subtitles: Record<Difficulty, string> = {
    lehka: `${DIFFICULTY_CONFIG.lehka.letters} písmena · ${DIFFICULTY_CONFIG.lehka.tries} pokusů`,
    stredni: `${DIFFICULTY_CONFIG.stredni.letters} písmen · ${DIFFICULTY_CONFIG.stredni.tries} pokusů`,
    tezka: `${DIFFICULTY_CONFIG.tezka.letters} písmen · ${DIFFICULTY_CONFIG.tezka.tries} pokusů`,
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-8 px-4">
      <div className="text-center">
        <div className="text-5xl mb-3">🔤</div>
        <h2 className="text-3xl font-bold text-text-primary">Slova</h2>
        <p className="text-text-secondary mt-2 max-w-xs">
          Hádej skryté české slovo. Zelená, žlutá nebo šedá tě navedou na správnou stopu.
        </p>
      </div>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <p className="text-text-secondary text-xs uppercase tracking-widest text-center">Vyber obtížnost</p>
        {DIFFICULTIES.map((d) => (
          <button
            key={d}
            onClick={() => onSelect(d)}
            className="w-full py-4 rounded-xl border border-border-default bg-bg-secondary hover:border-border-filled transition-all"
          >
            <div className="text-text-primary font-bold text-lg">{DIFFICULTY_CONFIG[d].label}</div>
            <div className="text-text-secondary text-sm mt-0.5">{subtitles[d]}</div>
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

  useEffect(() => { setHasMounted(true); }, []);

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
