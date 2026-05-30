'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Difficulty, DIFFICULTY_CONFIG, GameState, Stats, Tile, TileState } from '@/types';
import { evaluateGuess, getBestLetterState } from '@/lib/gameLogic';
import { isValidWord } from '@/lib/words';

const SESSION_KEY = 'slovbal-session';
const STATS_PREFIX = 'slovbal-stats-';
const GAME_STATE_PREFIX = 'slovbal-game-';

function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function getTodayString(): string {
  return new Date().toISOString().slice(0, 10);
}

function createEmptyBoard(rows: number, cols: number): Tile[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ letter: '', state: 'empty' as TileState }))
  );
}

function getInitialStats(): Stats {
  return {
    played: 0,
    won: 0,
    streak: 0,
    maxStreak: 0,
    distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 },
  };
}

function loadStats(difficulty: Difficulty): Stats {
  if (typeof window === 'undefined') return getInitialStats();
  try {
    const stored = localStorage.getItem(STATS_PREFIX + difficulty);
    if (stored) return JSON.parse(stored);
  } catch {}
  return getInitialStats();
}

function saveStats(difficulty: Difficulty, stats: Stats): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STATS_PREFIX + difficulty, JSON.stringify(stats));
}

interface SavedGameState {
  board: Tile[][];
  currentRow: number;
  currentCol: number;
  gameStatus: 'playing' | 'won' | 'lost';
  solution: string;
  letterStates: Record<string, TileState>;
  date: string;
  difficulty: Difficulty;
}

function loadGameState(difficulty: Difficulty): SavedGameState | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(GAME_STATE_PREFIX + difficulty);
    if (stored) {
      const parsed: SavedGameState = JSON.parse(stored);
      // Only restore if it's from today
      if (parsed.date === getTodayString()) {
        return parsed;
      }
    }
  } catch {}
  return null;
}

function saveGameState(state: SavedGameState): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(GAME_STATE_PREFIX + state.difficulty, JSON.stringify(state));
}

export interface UseGameReturn {
  gameState: GameState;
  difficulty: Difficulty;
  isLoading: boolean;
  isShaking: boolean;
  revealingRow: number | null;
  showModal: boolean;
  toastMessage: string | null;
  stats: Stats;
  handleKey: (key: string) => void;
  dismissModal: () => void;
  resetGame: (newDifficulty?: Difficulty) => void;
}

export function useGame(
  initialDifficulty: Difficulty,
  onWin?: () => void,
  onError?: () => void,
  onReveal?: () => void
): UseGameReturn {
  const config = DIFFICULTY_CONFIG[initialDifficulty];

  const [difficulty, setDifficulty] = useState<Difficulty>(initialDifficulty);
  const [isLoading, setIsLoading] = useState(true);
  const [isShaking, setIsShaking] = useState(false);
  const [revealingRow, setRevealingRow] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats>(() => loadStats(initialDifficulty));

  const [gameState, setGameState] = useState<GameState>(() => {
    const cfg = DIFFICULTY_CONFIG[initialDifficulty];
    return {
      board: createEmptyBoard(cfg.tries, cfg.letters),
      currentRow: 0,
      currentCol: 0,
      gameStatus: 'playing',
      solution: '',
      letterStates: {},
    };
  });

  const isRevealingRef = useRef(false);
  const gameEndedRef = useRef(false);

  const showToast = useCallback((message: string, duration = 2000) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), duration);
  }, []);

  // Fetch daily word and restore state
  const fetchWordAndRestore = useCallback(async (diff: Difficulty, forceNew = false) => {
    setIsLoading(true);
    const cfg = DIFFICULTY_CONFIG[diff];

    try {
      // Check for saved game state first (skip if forceNew)
      const saved = forceNew ? null : loadGameState(diff);

      const res = await fetch(`/api/daily-word?difficulty=${diff}`);
      const data = await res.json();
      const solution: string = data.word || '';

      if (!solution) {
        throw new Error('No word received');
      }

      if (saved && saved.solution === solution) {
        // Restore saved state
        setGameState({
          board: saved.board,
          currentRow: saved.currentRow,
          currentCol: saved.currentCol,
          gameStatus: saved.gameStatus,
          solution: saved.solution,
          letterStates: saved.letterStates,
        });
        gameEndedRef.current = saved.gameStatus !== 'playing';
        if (saved.gameStatus !== 'playing') {
          setTimeout(() => setShowModal(true), 500);
        }
      } else {
        // Fresh game
        const newState: GameState = {
          board: createEmptyBoard(cfg.tries, cfg.letters),
          currentRow: 0,
          currentCol: 0,
          gameStatus: 'playing',
          solution,
          letterStates: {},
        };
        setGameState(newState);
        gameEndedRef.current = false;
      }
    } catch {
      // Fallback: use empty solution, game will still work with localStorage fallback
      const newState: GameState = {
        board: createEmptyBoard(cfg.tries, cfg.letters),
        currentRow: 0,
        currentCol: 0,
        gameStatus: 'playing',
        solution: '',
        letterStates: {},
      };
      setGameState(newState);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWordAndRestore(initialDifficulty);
  }, [initialDifficulty, fetchWordAndRestore]);

  const handleKey = useCallback(
    (key: string) => {
      if (isLoading || isRevealingRef.current || gameEndedRef.current) return;

      const upperKey = key.toUpperCase();

      if (upperKey === 'BACKSPACE' || upperKey === '⌫') {
        setGameState((prev) => {
          if (prev.currentCol === 0) return prev;
          const newBoard = prev.board.map((row) => [...row.map((t) => ({ ...t }))]);
          const newCol = prev.currentCol - 1;
          newBoard[prev.currentRow][newCol] = { letter: '', state: 'empty' };
          return { ...prev, board: newBoard, currentCol: newCol };
        });
        return;
      }

      if (upperKey === 'ENTER') {
        setGameState((prev) => {
          const cfg = DIFFICULTY_CONFIG[difficulty];
          if (prev.currentCol < cfg.letters) {
            // Not enough letters
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
            showToast('Nedostatek písmen');
            return prev;
          }

          const guess = prev.board[prev.currentRow]
            .map((t) => t.letter.toLowerCase())
            .join('');

          // Validate word
          if (!isValidWord(guess, difficulty)) {
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
            showToast('Slovo není v seznamu');
            onError?.();
            return prev;
          }

          // Evaluate guess
          const results = evaluateGuess(guess, prev.solution);
          const newBoard = prev.board.map((row) => [...row.map((t) => ({ ...t }))]);

          results.forEach((state, i) => {
            newBoard[prev.currentRow][i] = {
              letter: prev.board[prev.currentRow][i].letter,
              state,
            };
          });

          // Update letter states
          const newLetterStates = { ...prev.letterStates };
          results.forEach((state, i) => {
            const letter = guess[i];
            newLetterStates[letter] = getBestLetterState(newLetterStates[letter], state);
          });

          const isWon = results.every((s) => s === 'correct');
          const isLastRow = prev.currentRow === cfg.tries - 1;
          const newStatus =
            isWon ? 'won' : isLastRow ? 'lost' : 'playing';

          const newGameState: GameState = {
            ...prev,
            board: newBoard,
            currentRow: newStatus === 'playing' ? prev.currentRow + 1 : prev.currentRow,
            currentCol: 0,
            gameStatus: newStatus,
            letterStates: newLetterStates,
          };

          // Trigger reveal animation
          isRevealingRef.current = true;
          setRevealingRow(prev.currentRow);
          onReveal?.();

          const revealDuration = cfg.letters * 300 + 500;

          setTimeout(() => {
            isRevealingRef.current = false;
            setRevealingRow(null);

            if (newStatus !== 'playing') {
              gameEndedRef.current = true;

              // Update stats
              const newStats = loadStats(difficulty);
              newStats.played++;
              if (isWon) {
                newStats.won++;
                newStats.streak++;
                newStats.maxStreak = Math.max(newStats.maxStreak, newStats.streak);
                const tries = prev.currentRow + 1;
                newStats.distribution[tries] = (newStats.distribution[tries] || 0) + 1;
                onWin?.();
              } else {
                newStats.streak = 0;
              }
              saveStats(difficulty, newStats);
              setStats(newStats);

              // Save score to API
              const sessionId = getSessionId();
              fetch('/api/scores', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  session_id: sessionId,
                  tries: isWon ? prev.currentRow + 1 : cfg.tries,
                  won: isWon,
                  difficulty,
                }),
              }).catch(() => {});

              setTimeout(() => setShowModal(true), 500);
            }

            // Save state
            saveGameState({
              board: newBoard,
              currentRow: newGameState.currentRow,
              currentCol: 0,
              gameStatus: newStatus,
              solution: prev.solution,
              letterStates: newLetterStates,
              date: getTodayString(),
              difficulty,
            });
          }, revealDuration);

          // Save intermediate state immediately
          saveGameState({
            board: newBoard,
            currentRow: newGameState.currentRow,
            currentCol: 0,
            gameStatus: newStatus,
            solution: prev.solution,
            letterStates: newLetterStates,
            date: getTodayString(),
            difficulty,
          });

          return newGameState;
        });
        return;
      }

      // Letter input
      const czechLetters = /^[A-ZÁČĎÉĚÍŇÓŘŠŤŮÚÝŽ]$/;
      if (!czechLetters.test(upperKey)) return;

      setGameState((prev) => {
        const cfg = DIFFICULTY_CONFIG[difficulty];
        if (prev.currentCol >= cfg.letters) return prev;

        const newBoard = prev.board.map((row) => [...row.map((t) => ({ ...t }))]);
        newBoard[prev.currentRow][prev.currentCol] = {
          letter: upperKey,
          state: 'filled',
        };

        return {
          ...prev,
          board: newBoard,
          currentCol: prev.currentCol + 1,
        };
      });
    },
    [isLoading, difficulty, onWin, onError, onReveal, showToast]
  );

  const dismissModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const resetGame = useCallback(
    (newDifficulty?: Difficulty) => {
      const diff = newDifficulty || difficulty;
      setDifficulty(diff);
      setShowModal(false);
      gameEndedRef.current = false;
      isRevealingRef.current = false;
      setRevealingRow(null);
      setIsShaking(false);
      setStats(loadStats(diff));
      fetchWordAndRestore(diff, true); // forceNew=true: ignoruj uložený stav
    },
    [difficulty, fetchWordAndRestore]
  );

  return {
    gameState,
    difficulty,
    isLoading,
    isShaking,
    revealingRow,
    showModal,
    toastMessage,
    stats,
    handleKey,
    dismissModal,
    resetGame,
  };
}
