import React from 'react';
import { TileStatus } from '../../types';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  keyboardStatus: Record<string, TileStatus>;
  disabled?: boolean;
}

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, keyboardStatus, disabled = false }) => {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
  ];
  
  const getKeyClass = (key: string) => {
    const status = keyboardStatus[key];
    
    if (!status) return '';
    
    switch (status) {
      case 'correct':
        return 'bg-success-500 text-white';
      case 'present':
        return 'bg-warning-500 text-white';
      case 'absent':
        return 'bg-neutral-600 text-white';
      default:
        return '';
    }
  };
  
  const handleKeyPress = (key: string) => {
    if (disabled) return;
    onKeyPress(key);
  };
  
  return (
    <div className="keyboard w-full max-w-lg mx-auto">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-2">
          {row.map((key) => (
            <button
              key={key}
              className={`keyboard-key ${key.length > 1 ? 'px-3 sm:px-4' : 'px-1 sm:px-3'} ${getKeyClass(key)}`}
              onClick={() => handleKeyPress(key)}
              disabled={disabled}
            >
              {key === 'BACKSPACE' ? (
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" className="w-5 h-5">
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