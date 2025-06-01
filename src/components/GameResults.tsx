import React from 'react';
import { Player } from '../types';

interface GameResultsProps {
  players: Player[];
  word: string;
  playerColors: Record<string, string>;
}

const GameResults: React.FC<GameResultsProps> = ({
  players,
  word,
  playerColors,
}) => {
  // Sort players by score (highest first) and then by guessCount (lowest first)
  const sortedPlayers = [...players].sort((a, b) => {
    if (a.score !== b.score) return b.score - a.score;
    return a.guessCount - b.guessCount;
  });

  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4'>
      <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
        Game Results
      </h3>

      <div className='mb-4 text-center'>
        <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
          The word was:
        </p>
        <p className='text-2xl font-bold text-gray-900 dark:text-white tracking-wider'>
          {word}
        </p>
      </div>

      <div className='space-y-2'>
        {sortedPlayers.map((player, index) => {
          const playerColor = playerColors[player.id] || '#4f46e5';

          return (
            <div
              key={player.id}
              className={`
                flex items-center p-3 rounded-md
                ${
                  index === 0
                    ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
                    : ''
                }
              `}>
              <div className='flex items-center justify-center w-8 h-8 mr-3'>
                {index === 0 ? (
                  <span className='text-xl text-yellow-500'>🏆</span>
                ) : (
                  <span
                    className='w-8 h-8 rounded-full flex items-center justify-center text-white font-bold'
                    style={{ backgroundColor: playerColor }}>
                    {index + 1}
                  </span>
                )}
              </div>

              <div className='flex-1'>
                <div className='font-medium text-gray-900 dark:text-white'>
                  {player.name}
                  {player.isHost && (
                    <span className='ml-2 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full'>
                      Host
                    </span>
                  )}
                </div>
                <div className='text-xs text-gray-500 dark:text-gray-400'>
                  {player.guessCount > 0
                    ? `${player.guessCount} ${
                        player.guessCount === 1 ? 'guess' : 'guesses'
                      }`
                    : 'No guesses'}
                </div>
              </div>

              <div className='text-lg font-bold text-gray-900 dark:text-white'>
                {player.score} {player.score === 1 ? 'pt' : 'pts'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameResults;
