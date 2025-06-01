import React from 'react';
import { Player } from '../../types';
import { Users } from 'lucide-react';

interface PlayerListProps {
  players: Player[];
  maxPlayers: number;
  compact?: boolean;
}

const PLAYER_COLORS = [
  '#3B82F6', // blue
  '#F97316', // orange
  '#14B8A6', // teal
  '#8B5CF6', // purple
  '#EF4444', // red
];

export const getPlayerColor = (index: number): string => {
  return PLAYER_COLORS[index % PLAYER_COLORS.length];
};

const PlayerList: React.FC<PlayerListProps> = ({ players, maxPlayers, compact = false }) => {
  const placeholders = Array.from({ length: Math.max(0, maxPlayers - players.length) });
  
  if (compact) {
    return (
      <div className="flex items-center">
        <div className="flex -space-x-2 mr-2">
          {players.map((player, index) => (
            <div
              key={player.id}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm border-2 border-white dark:border-neutral-800"
              style={{ backgroundColor: getPlayerColor(index) }}
            >
              {player.name.charAt(0).toUpperCase()}
            </div>
          ))}
          {placeholders.length > 0 && (
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 border-2 border-white dark:border-neutral-800">
              <Users className="w-4 h-4" />
            </div>
          )}
        </div>
        <span className="text-sm text-neutral-600 dark:text-neutral-400">
          {players.length}/{maxPlayers} players
        </span>
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Players</h3>
        <span className="text-sm text-neutral-600 dark:text-neutral-400">
          {players.length}/{maxPlayers}
        </span>
      </div>
      <div className="space-y-2">
        {players.map((player, index) => (
          <div key={player.id} className="flex items-center">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium mr-3"
              style={{ backgroundColor: getPlayerColor(index) }}
            >
              {player.name.charAt(0).toUpperCase()}
            </div>
            <span>{player.name}</span>
            {player.isHost && (
              <span className="ml-2 text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-0.5 rounded-full">
                Host
              </span>
            )}
          </div>
        ))}
        {placeholders.map((_, index) => (
          <div key={`placeholder-${index}`} className="flex items-center opacity-40">
            <div className="w-8 h-8 rounded-full bg-neutral-300 dark:bg-neutral-700 mr-3 flex items-center justify-center">
              <Users className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
            </div>
            <span className="text-neutral-400 dark:text-neutral-500">Waiting for player...</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;