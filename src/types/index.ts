export type Difficulty = 'lehka' | 'stredni' | 'tezka';
export type GameMode = 'daily' | 'practice';

export type TileState = 'empty' | 'filled' | 'correct' | 'present' | 'absent';

export interface Tile {
  letter: string;
  state: TileState;
}

export interface GameState {
  board: Tile[][];
  currentRow: number;
  currentCol: number;
  gameStatus: 'playing' | 'won' | 'lost';
  solution: string;
  letterStates: Record<string, TileState>;
}

export interface Stats {
  played: number;
  won: number;
  streak: number;
  maxStreak: number;
  distribution: Record<number, number>;
}

export interface DifficultyConfig {
  letters: number;
  tries: number;
  label: string;
}

export const DIFFICULTY_CONFIG: Record<Difficulty, DifficultyConfig> = {
  lehka: { letters: 4, tries: 7, label: 'Lehká' },
  stredni: { letters: 5, tries: 6, label: 'Střední' },
  tezka: { letters: 6, tries: 5, label: 'Těžká' },
};
