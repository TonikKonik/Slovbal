import { TileState } from '@/types';

/**
 * Evaluates a guess against the solution using standard Wordle rules.
 * Handles duplicate letters correctly using a count-based approach.
 */
export function evaluateGuess(guess: string, solution: string): TileState[] {
  const guessArr = guess.toLowerCase().split('');
  const solutionArr = solution.toLowerCase().split('');
  const result: TileState[] = new Array(guess.length).fill('absent');

  // Count remaining letters in solution (for duplicate handling)
  const solutionLetterCount: Record<string, number> = {};
  for (const letter of solutionArr) {
    solutionLetterCount[letter] = (solutionLetterCount[letter] || 0) + 1;
  }

  // First pass: mark correct positions (green)
  for (let i = 0; i < guessArr.length; i++) {
    if (guessArr[i] === solutionArr[i]) {
      result[i] = 'correct';
      solutionLetterCount[guessArr[i]]--;
    }
  }

  // Second pass: mark present letters (yellow)
  for (let i = 0; i < guessArr.length; i++) {
    if (result[i] === 'correct') continue;
    const letter = guessArr[i];
    if (solutionLetterCount[letter] && solutionLetterCount[letter] > 0) {
      result[i] = 'present';
      solutionLetterCount[letter]--;
    }
  }

  return result;
}

/**
 * Determine the best state for a letter across all guesses
 * Priority: correct > present > absent
 */
export function getBestLetterState(
  current: TileState | undefined,
  newState: TileState
): TileState {
  if (current === 'correct') return 'correct';
  if (newState === 'correct') return 'correct';
  if (current === 'present') return 'present';
  if (newState === 'present') return 'present';
  return newState;
}
