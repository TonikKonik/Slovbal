'use client';

import { GameState, Difficulty, DIFFICULTY_CONFIG } from '@/types';
import { GameTile } from './GameTile';

interface GameBoardProps {
  gameState: GameState;
  difficulty: Difficulty;
  isShaking: boolean;
  revealingRow: number | null;
}

export function GameBoard({ gameState, difficulty, isShaking, revealingRow }: GameBoardProps) {
  const { board, currentRow } = gameState;
  const config = DIFFICULTY_CONFIG[difficulty];

  // Calculate tile size based on word length
  const getTileSize = () => {
    if (config.letters === 4) return 'w-16 h-16 sm:w-20 sm:h-20';
    if (config.letters === 5) return 'w-14 h-14 sm:w-16 sm:h-16';
    return 'w-12 h-12 sm:w-14 sm:h-14';
  };

  const getGap = () => {
    if (config.letters === 4) return 'gap-2';
    return 'gap-1.5';
  };

  const tileSize = getTileSize();
  const gap = getGap();

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <div className={`flex flex-col ${gap}`}>
        {board.map((row, rowIndex) => {
          const isCurrentRow = rowIndex === currentRow;
          const isRevealingThisRow = revealingRow === rowIndex;

          return (
            <div
              key={rowIndex}
              className={`flex ${gap} ${isCurrentRow && isShaking ? 'row-shake' : ''}`}
            >
              {row.map((tile, colIndex) => (
                <div key={colIndex} className={`${tileSize}`}>
                  <GameTile
                    letter={tile.letter}
                    state={tile.state}
                    isRevealing={isRevealingThisRow}
                    revealDelay={colIndex * 300}
                  />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
