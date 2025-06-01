import React from 'react';
import { Player } from '../types';

interface PlayerListProps {
  players: Player[];
  currentPlayerId: string;
  playerColors: Record<string, string>;
}

const PlayerList: React.FC<PlayerListProps> = ({ players, currentPlayerId, playerColors }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Players</h3>
      
      <div className="space-y-2">
        {players.map((player) => {
          const isCurrentPlayer = player.id === currentPlayerId;
          const playerColor = playerColors[player.id] || '#4f46e5';
          
          return (
            <div 
              key={player.id} 
              className={`
                flex items-center p-2 rounded-md
                ${isCurrentPlayer ? 'bg-gray-100 dark:bg-gray-700' : ''}
              `}
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3"
                style={{ backgroundColor: playerColor }}
              >
                {player.name.charAt(0).toUpperCase()}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {player.name}
                  </span>
                  {isCurrentPlayer && (
                    <span className="ml-2 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full">
                      You
                    </span>
                  )}
                  {player.isHost && (
                    <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full">
                      Host
                    </span>
                  )}
                </div>
                
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {player.guessCount > 0 ? `${player.guessCount} guesses` : 'No guesses yet'}
                </div>
              </div>
              
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {player.score > 0 ? player.score : '-'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerList;