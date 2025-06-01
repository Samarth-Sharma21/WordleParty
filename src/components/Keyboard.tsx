import React from 'react';
import { TileStatus } from '../types';

interface KeyboardProps {
  onKeyClick: (key: string) => void;
  keyboardStatus: Record<string, TileStatus>;
}

const Keyboard: React.FC<KeyboardProps> = ({ onKeyClick, keyboardStatus }) => {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
  ];
  
  const getKeyClass = (key: string) => {
    if (key === 'ENTER' || key === 'BACKSPACE') {
      return 'bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white font-medium';
    }
    
    const status = keyboardStatus[key];
    
    if (!status) {
      return 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white';
    }
    
    switch (status) {
      case 'correct':
        return 'bg-green-500 dark:bg-green-600 text-white';
      case 'present':
        return 'bg-yellow-500 dark:bg-yellow-600 text-white';
      case 'absent':
        return 'bg-gray-500 dark:bg-gray-700 text-white';
      default:
        return 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white';
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1 mb-2">
          {row.map((key) => (
            <button
              key={key}
              className={`
                ${getKeyClass(key)}
                ${key.length > 1 ? 'px-2 sm:px-3 text-xs' : 'px-1 sm:px-2'}
                py-3 sm:py-4 rounded font-medium transition-colors
                hover:opacity-90 active:opacity-80
              `}
              onClick={() => onKeyClick(key)}
            >
              {key === 'BACKSPACE' ? (
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" className="w-5 h-5">
                  <path fill="currentColor" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.67-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path>
                </svg>
              ) : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;