import React from 'react';
import { TileStatus } from '../../types';

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
  const statusClasses = {
    correct: 'letter-correct',
    present: 'letter-present',
    absent: 'letter-absent',
    pending: 'letter-pending',
  };
  
  // Add animation delay based on position for reveal effect
  const animationDelay = `${position * 0.15}s`;
  
  // Animations based on status
  const getAnimation = () => {
    if (isCurrentRow && letter && status === 'pending') {
      return 'animate-bounce-in';
    }
    
    if (status !== 'pending' && letter) {
      return 'animate-scale-in';
    }
    
    return '';
  };
  
  return (
    <div
      className={`letter-tile ${statusClasses[status]} ${getAnimation()}`}
      style={{ 
        animationDelay,
        borderColor: playerColor ? playerColor : undefined
      }}
    >
      {letter}
      {playerColor && status !== 'pending' && (
        <div 
          className="absolute bottom-0 right-0 w-2 h-2 rounded-full" 
          style={{ backgroundColor: playerColor }}
        />
      )}
    </div>
  );
};

export default LetterTile;