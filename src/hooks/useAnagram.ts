'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Difficulty, DIFFICULTY_CONFIG } from '@/types';
import { getRandomWord } from '@/lib/words';

export type AnagramStatus = 'playing' | 'correct' | 'timeout' | 'gameover';

export interface AnagramState {
  word: string;
  available: (string | null)[];   // null = used
  answer: (string | null)[];      // null = empty slot
  timeLeft: number;
  totalTime: number;
  score: number;
  round: number;
  totalRounds: number;
  status: AnagramStatus;
}

const ROUNDS = 5;
const TIME_BY_DIFFICULTY: Record<Difficulty, number> = {
  lehka: 45,
  stredni: 60,
  tezka: 75,
};

function scramble(word: string): string[] {
  const letters = word.toUpperCase().split('');
  let shuffled: string[];
  let attempts = 0;
  do {
    shuffled = [...letters].sort(() => Math.random() - 0.5);
    attempts++;
  } while (shuffled.join('') === letters.join('') && attempts < 20);
  return shuffled;
}

function createRound(difficulty: Difficulty, score: number, round: number): AnagramState {
  const word = getRandomWord(difficulty);
  const totalTime = TIME_BY_DIFFICULTY[difficulty];
  return {
    word,
    available: scramble(word),
    answer: Array(word.length).fill(null),
    timeLeft: totalTime,
    totalTime,
    score,
    round,
    totalRounds: ROUNDS,
    status: 'playing',
  };
}

export function useAnagram(difficulty: Difficulty) {
  const [state, setState] = useState<AnagramState>(() => createRound(difficulty, 0, 1));
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setState((prev) => {
        if (prev.status !== 'playing') { stopTimer(); return prev; }
        if (prev.timeLeft <= 1) {
          stopTimer();
          return { ...prev, timeLeft: 0, status: 'timeout' };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);
  }, [stopTimer]);

  useEffect(() => {
    startTimer();
    return stopTimer;
  }, [startTimer, stopTimer]);

  // Click available letter → move to next empty answer slot
  const selectLetter = useCallback((availIndex: number) => {
    setState((prev) => {
      if (prev.status !== 'playing') return prev;
      if (prev.available[availIndex] === null) return prev;

      const emptySlot = prev.answer.findIndex((s) => s === null);
      if (emptySlot === -1) return prev;

      const newAvailable = [...prev.available];
      const letter = newAvailable[availIndex]!;
      newAvailable[availIndex] = null;

      const newAnswer = [...prev.answer];
      newAnswer[emptySlot] = letter;

      // Check if complete
      const complete = newAnswer.every((s) => s !== null);
      if (complete) {
        const guess = newAnswer.join('').toLowerCase();
        if (guess === prev.word) {
          stopTimer();
          const timeBonus = prev.timeLeft * 10;
          const lengthBonus = prev.word.length * 50;
          const newScore = prev.score + timeBonus + lengthBonus;
          const isLast = prev.round >= prev.totalRounds;
          return {
            ...prev,
            available: newAvailable,
            answer: newAnswer,
            score: newScore,
            status: isLast ? 'gameover' : 'correct',
          };
        }
        // Wrong - shake and clear answer
        return { ...prev, available: newAvailable, answer: newAnswer };
      }

      return { ...prev, available: newAvailable, answer: newAnswer };
    });
  }, [stopTimer]);

  // Click answer letter → return to available
  const unselectLetter = useCallback((answerIndex: number) => {
    setState((prev) => {
      if (prev.status !== 'playing') return prev;
      if (prev.answer[answerIndex] === null) return prev;

      const letter = prev.answer[answerIndex]!;
      const newAnswer = [...prev.answer];
      newAnswer[answerIndex] = null;

      // Return to first null slot in available
      const newAvailable = [...prev.available];
      const slot = newAvailable.findIndex((s) => s === null);
      if (slot !== -1) newAvailable[slot] = letter;
      else newAvailable.push(letter);

      return { ...prev, available: newAvailable, answer: newAnswer };
    });
  }, []);

  // Clear entire answer
  const clearAnswer = useCallback(() => {
    setState((prev) => {
      if (prev.status !== 'playing') return prev;
      const letters = prev.answer.filter(Boolean) as string[];
      const newAvailable = [...prev.available];
      letters.forEach((l) => {
        const slot = newAvailable.findIndex((s) => s === null);
        if (slot !== -1) newAvailable[slot] = l;
        else newAvailable.push(l);
      });
      return { ...prev, available: newAvailable, answer: Array(prev.word.length).fill(null) };
    });
  }, []);

  // Shuffle remaining available letters
  const reshuffleAvailable = useCallback(() => {
    setState((prev) => {
      if (prev.status !== 'playing') return prev;
      const letters = prev.available.filter(Boolean) as string[];
      const shuffled = [...letters].sort(() => Math.random() - 0.5);
      const newAvailable = prev.available.map((l) => (l === null ? null : shuffled.shift()!));
      return { ...prev, available: newAvailable };
    });
  }, []);

  // Next round
  const nextRound = useCallback(() => {
    setState((prev) => {
      if (prev.status !== 'correct') return prev;
      const next = createRound(difficulty, prev.score, prev.round + 1);
      return next;
    });
    startTimer();
  }, [difficulty, startTimer]);

  // Restart game
  const restart = useCallback(() => {
    stopTimer();
    setState(createRound(difficulty, 0, 1));
    startTimer();
  }, [difficulty, startTimer, stopTimer]);

  return { state, selectLetter, unselectLetter, clearAnswer, reshuffleAvailable, nextRound, restart };
}
