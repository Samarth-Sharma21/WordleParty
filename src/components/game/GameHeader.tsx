import React from 'react';
import { GameStatus } from '../../types';
import { useGame } from '../../context/GameContext';
import { Share2, ArrowLeft } from 'lucide-react';
import Button from '../ui/Button';

interface GameHeaderProps {
  roomCode: string;
  status: GameStatus;
  onCopyCode: () => void;
  onBack: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({ roomCode, status, onCopyCode, onBack }) => {
  return (
    <div className="flex items-center justify-between mb-6 w-full">
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="text-neutral-500"
      >
        <ArrowLeft className="w-5 h-5 mr-1" />
        <span className="hidden sm:inline">Back</span>
      </Button>
      
      <div className="text-center">
        <h1 className="text-xl font-bold">WordleParty</h1>
        <div className="text-sm text-neutral-500 dark:text-neutral-400">
          {status === 'waiting' ? 'Waiting for players' : 'Game in progress'}
        </div>
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onCopyCode}
        className="flex items-center"
      >
        <span className="font-mono mr-1">{roomCode}</span>
        <Share2 className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default GameHeader;