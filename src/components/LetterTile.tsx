import React from 'react';
import { TileStatus } from '../types';

interface LetterTileProps {
  letter: string;
  status: TileStatus;
  position: number;
  isCurrentRow?: boolean;
  playerColor?: string;
}

const LetterTile: React.FC<LetterTileProps> = ({
  letter,
  status,
  position,
  isCurrentRow = false,
  playerColor,
}) => {
  // Add animation delay based on position for reveal effect
  const animationDelay = `${position * 0.15}s`;

  // Animations based on status
  const getAnimation = () => {
    if (isCurrentRow && letter) {
      return 'animate-bounce-in';
    }

    if (status !== 'empty' && letter) {
      return 'animate-scale-in';
    }

    return '';
  };

  // Get the appropriate CSS classes based on status
  const getStatusClasses = () => {
    switch (status) {
      case 'correct':
        return 'bg-green-500 text-white border-green-500';
      case 'present':
        return 'bg-yellow-500 text-white border-yellow-500';
      case 'absent':
        return 'bg-gray-500 text-white border-gray-500';
      case 'empty':
      default:
        return letter
          ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600'
          : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600';
    }
  };

  return (
    <div
      className={`
        relative flex items-center justify-center
        w-14 h-14 text-2xl font-bold uppercase
        border-2 m-0.5 select-none
        ${getStatusClasses()}
        ${getAnimation()}
      `}
      style={{
        animationDelay,
        borderColor:
          playerColor && status === 'empty' ? playerColor : undefined,
      }}>
      {letter}
      {playerColor && status !== 'empty' && (
        <div
          className='absolute bottom-0 right-0 w-2 h-2 rounded-full'
          style={{ backgroundColor: playerColor }}
        />
      )}
    </div>
  );
};

export default LetterTile;
