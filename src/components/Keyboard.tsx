'use client';

import { TileState } from '@/types';

interface KeyboardProps {
  letterStates: Record<string, TileState>;
  onKey: (key: string) => void;
}

const ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ů'],
  ['ENTER', 'Y', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
  ['Á', 'Č', 'Ď', 'É', 'Ě', 'Í', 'Ň', 'Ó', 'Ř', 'Š', 'Ť', 'Ú', 'Ý', 'Ž'],
];

const STATE_CLASSES: Record<string, string> = {
  correct: 'bg-key-correct text-white border-key-correct',
  present: 'bg-key-present text-white border-key-present',
  absent: 'bg-key-absent text-white border-key-absent',
  default: 'bg-key-default text-white border-key-default',
};

function getKeyClass(key: string, letterStates: Record<string, TileState>): string {
  const lowerKey = key.toLowerCase();
  const state = letterStates[lowerKey];
  if (state && STATE_CLASSES[state]) {
    return STATE_CLASSES[state];
  }
  return STATE_CLASSES.default;
}

interface KeyProps {
  value: string;
  letterStates: Record<string, TileState>;
  onKey: (key: string) => void;
}

interface KeyProps {
  value: string;
  letterStates: Record<string, TileState>;
  onKey: (key: string) => void;
  small?: boolean;
}

function Key({ value, letterStates, onKey, small }: KeyProps) {
  const isSpecial = value === 'ENTER' || value === '⌫';
  const colorClass = isSpecial ? 'bg-[#565758] text-white border-[#565758]' : getKeyClass(value, letterStates);

  const handlePress = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    onKey(value);
  };

  return (
    <button
      onMouseDown={handlePress}
      onTouchStart={handlePress}
      className={`
        ${colorClass}
        ${isSpecial
          ? 'px-2 text-xs min-w-[44px]'
          : small
            ? 'w-7 text-xs'
            : 'w-8 sm:w-10 text-sm sm:text-base'
        }
        ${small ? 'h-9' : 'h-12 sm:h-14'}
        rounded font-bold uppercase select-none cursor-pointer
        active:opacity-75 transition-opacity
        flex items-center justify-center border
      `}
      aria-label={value}
    >
      {value}
    </button>
  );
}

export function Keyboard({ letterStates, onKey }: KeyboardProps) {
  return (
    <div className="flex flex-col items-center gap-1 pb-2 px-1">
      {ROWS.map((row, rowIndex) => {
        const isSmallRow = rowIndex === 3;
        return (
          <div key={rowIndex} className="flex gap-1 justify-center flex-wrap">
            {row.map((key) => (
              <Key
                key={key}
                value={key}
                letterStates={letterStates}
                onKey={onKey}
                small={isSmallRow}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
