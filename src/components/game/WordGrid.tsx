import React from 'react';
import LetterTile from './LetterTile';
import { TileStatus } from '../../types';

interface WordGridProps {
  attempts: string[][];
  evaluations: TileStatus[][];
  currentAttempt: number;
  wordLength: number;
  playerColors?: Record<string, string>;
}

const WordGrid: React.FC<WordGridProps> = ({
  attempts,
  evaluations,
  currentAttempt,
  wordLength,
  playerColors
}) => {
  return (
    <div className="grid gap-1 md:gap-2 mx-auto">
      {attempts.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1 md:gap-2 justify-center">
          {Array.from({ length: wordLength }).map((_, colIndex) => {
            const letter = row[colIndex] || '';
            const status = evaluations[rowIndex][colIndex] || 'pending';
            
            return (
              <LetterTile
                key={colIndex}
                letter={letter}
                status={status}
                position={colIndex}
                isCurrentRow={rowIndex === currentAttempt}
                playerColor={playerColors ? playerColors[`player-${rowIndex}`] : undefined}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default WordGrid;