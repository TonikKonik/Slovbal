'use client';

import { useState, useCallback } from 'react';
import { GeoCategory, getRandomGeoWord } from '@/lib/geoWords';

export type MistopisStatus = 'playing' | 'won' | 'lost';

export interface MistopisState {
  word: string;
  category: GeoCategory;
  guessedLetters: string[];
  livesLeft: number;
  maxLives: number;
  status: MistopisStatus;
}

const MAX_LIVES = 7;

function getLettersInWord(word: string): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const c of word.split('')) {
    if (c !== ' ' && c !== '-' && !seen.has(c)) {
      seen.add(c);
      result.push(c);
    }
  }
  return result;
}

function isWordRevealed(word: string, guessed: string[]): boolean {
  const g = new Set(guessed);
  const letters = getLettersInWord(word);
  return letters.length > 0 && letters.every(l => g.has(l));
}

function createRound(category: GeoCategory): MistopisState {
  return {
    word: getRandomGeoWord(category),
    category,
    guessedLetters: [],
    livesLeft: MAX_LIVES,
    maxLives: MAX_LIVES,
    status: 'playing',
  };
}

export function useMistopis(category: GeoCategory) {
  const [state, setState] = useState<MistopisState>(() => createRound(category));

  const guessLetter = useCallback((letter: string) => {
    setState(prev => {
      if (prev.status !== 'playing') return prev;
      const upper = letter.toUpperCase();
      if (prev.guessedLetters.includes(upper)) return prev;

      const newGuessed = [...prev.guessedLetters, upper];
      const inWord = getLettersInWord(prev.word).includes(upper);
      const newLives = inWord ? prev.livesLeft : prev.livesLeft - 1;
      const won = isWordRevealed(prev.word, newGuessed);
      const lost = !inWord && newLives <= 0;

      return {
        ...prev,
        guessedLetters: newGuessed,
        livesLeft: newLives,
        status: won ? 'won' : lost ? 'lost' : 'playing',
      };
    });
  }, []);

  const guessWholeWord = useCallback((attempt: string): boolean => {
    const normalized = attempt.toUpperCase().trim();
    setState(prev => {
      if (prev.status !== 'playing') return prev;
      if (normalized === prev.word) {
        return { ...prev, guessedLetters: getLettersInWord(prev.word), status: 'won' };
      }
      // Wrong full guess costs 2 lives
      const newLives = Math.max(0, prev.livesLeft - 2);
      return {
        ...prev,
        livesLeft: newLives,
        status: newLives <= 0 ? 'lost' : 'playing',
      };
    });
    return normalized === state.word;
  }, [state.word]);

  const nextWord = useCallback(() => {
    setState(prev => createRound(prev.category));
  }, []);

  const restart = useCallback(() => {
    setState(prev => createRound(prev.category));
  }, []);

  return { state, guessLetter, guessWholeWord, nextWord, restart };
}
