import React from 'react';
import { TileStatus } from '../types';

interface WordGridProps {
  currentAttempt: string;
  attempts: string[];
  evaluations: TileStatus[][];
  wordLength: number;
  maxAttempts: number;
}

const WordGrid: React.FC<WordGridProps> = ({
  currentAttempt,
  attempts,
  evaluations,
  wordLength,
  maxAttempts
}) => {
  // Create a grid with the correct number of rows and columns
  const grid = [];
  
  // Add completed attempts
  for (let i = 0; i < attempts.length; i++) {
    const row = [];
    const word = attempts[i];
    
    for (let j = 0; j < wordLength; j++) {
      const letter = word[j] || '';
      const status = evaluations[i] ? evaluations[i][j] : 'empty';
      
      row.push({ letter, status });
    }
    
    grid.push(row);
  }
  
  // Add current attempt
  if (attempts.length < maxAttempts) {
    const row = [];
    
    for (let j = 0; j < wordLength; j++) {
      const letter = currentAttempt[j] || '';
      const status: TileStatus = letter ? 'empty' : 'empty';
      
      row.push({ letter, status });
    }
    
    grid.push(row);
  }
  
  // Add empty rows to fill the grid
  for (let i = grid.length; i < maxAttempts; i++) {
    const row = [];
    
    for (let j = 0; j < wordLength; j++) {
      row.push({ letter: '', status: 'empty' as TileStatus });
    }
    
    grid.push(row);
  }

  return (
    <div className="grid gap-2">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2 justify-center">
          {row.map((tile, colIndex) => (
            <div 
              key={colIndex} 
              className={`
                flex items-center justify-center
                w-14 h-14 text-2xl font-bold uppercase
                border-2 transition-colors duration-300
                ${tile.letter ? 'border-gray-400 dark:border-gray-500' : 'border-gray-300 dark:border-gray-600'}
                ${tile.status === 'correct' ? 'bg-green-500 text-white border-green-500 dark:bg-green-600 dark:border-green-600' : ''}
                ${tile.status === 'present' ? 'bg-yellow-500 text-white border-yellow-500 dark:bg-yellow-600 dark:border-yellow-600' : ''}
                ${tile.status === 'absent' ? 'bg-gray-500 text-white border-gray-500 dark:bg-gray-700 dark:border-gray-700' : ''}
                ${tile.status === 'empty' ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white' : ''}
              `}
            >
              {tile.letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WordGrid;