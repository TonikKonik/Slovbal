'use client';

import { TileState } from '@/types';

interface KeyboardProps {
  letterStates: Record<string, TileState>;
  onKey: (key: string) => void;
}

const ROWS = [
  ['Á', 'Č', 'Ď', 'É', 'Ě', 'Í', 'Ň', 'Ó', 'Ř', 'Š', 'Ť', 'Ú', 'Ý', 'Ž'],
  ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ů'],
  ['ENTER', 'Y', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
];

const STATE_CLASSES: Record<string, string> = {
  correct: 'bg-key-correct text-white border-key-correct',
  present: 'bg-key-present text-white border-key-present',
  absent: 'bg-key-absent text-white border-key-absent',
  default: 'bg-key-default text-white border-key-default',
};

function getKeyClass(key: string, letterStates: Record<string, TileState>): string {
  const state = letterStates[key.toLowerCase()];
  return (state && STATE_CLASSES[state]) ? STATE_CLASSES[state] : STATE_CLASSES.default;
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

  return (
    <button
      onClick={(e) => { e.preventDefault(); onKey(value); }}
      className={[
        colorClass,
        'rounded font-bold uppercase select-none cursor-pointer active:opacity-75 transition-opacity flex items-center justify-center border',
        isSpecial
          ? 'px-1.5 sm:px-2 text-[10px] sm:text-xs min-w-[40px] sm:min-w-[46px] h-10 sm:h-14'
          : small
            ? 'w-6 sm:w-7 h-8 sm:h-9 text-[10px] sm:text-xs'
            : 'w-[8.5vw] max-w-[40px] min-w-[28px] sm:w-10 h-10 sm:h-14 text-sm sm:text-base',
      ].join(' ')}
      aria-label={value}
    >
      {value}
    </button>
  );
}

export function Keyboard({ letterStates, onKey }: KeyboardProps) {
  return (
    <div className="flex flex-col items-center gap-1 pb-1 sm:pb-2 px-1">
      {ROWS.map((row, rowIndex) => {
        const isSmallRow = rowIndex === 0;
        return (
          <div
            key={rowIndex}
            className={`flex justify-center flex-nowrap ${isSmallRow ? 'gap-[2px] sm:gap-1' : 'gap-[3px] sm:gap-1'}`}
          >
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
