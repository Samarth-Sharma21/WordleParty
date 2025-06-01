import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { GameStatus } from '../../types';

interface GameResultsProps {
  status: GameStatus;
  answer: string;
  attempts: number;
  onPlayAgain: () => void;
  onQuit: () => void;
}

const GameResults: React.FC<GameResultsProps> = ({
  status,
  answer,
  attempts,
  onPlayAgain,
  onQuit,
}) => {
  if (status !== 'won' && status !== 'lost') return null;
  
  const isWon = status === 'won';
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md animate-scale-in">
        <div className="text-center mb-6">
          <h2 className={`text-2xl font-bold mb-2 ${isWon ? 'text-success-600' : 'text-error-600'}`}>
            {isWon ? 'You won!' : 'Game over!'}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300">
            {isWon
              ? `You guessed the word in ${attempts} ${attempts === 1 ? 'try' : 'tries'}!`
              : `The word was:`}
          </p>
          {!isWon && (
            <p className="text-2xl font-bold mt-2">{answer}</p>
          )}
        </div>
        
        <div className="text-center space-y-4">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {isWon
              ? 'Great job! Would you like to play another round?'
              : 'Better luck next time! Want to try again?'}
          </p>
          
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
            <Button
              variant="primary"
              onClick={onPlayAgain}
              fullWidth
            >
              Play Again
            </Button>
            
            <Button
              variant="outline"
              onClick={onQuit}
              fullWidth
            >
              Quit
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GameResults;