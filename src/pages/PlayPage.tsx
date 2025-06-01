import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { useNotification } from '../context/NotificationContext';
import { GameStatus } from '../types';

const PlayPage: React.FC = () => {
  const { createRoom, joinRoom, gameState } = useGame();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const [mode, setMode] = useState<'create' | 'join' | 'solo'>('create');
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [wordLength, setWordLength] = useState(5);
  const [maxPlayers, setMaxPlayers] = useState(3);

  // Navigate to game when room is ready
  useEffect(() => {
    if (gameState.room) {
      navigate('/game');
    }
  }, [gameState.room, navigate]);

  const handleCreateRoom = () => {
    if (!playerName.trim()) {
      addNotification({
        type: 'warning',
        message: 'Please enter your name to continue',
      });
      return;
    }

    createRoom(playerName, wordLength, maxPlayers, false);
  };

  const handlePlaySolo = () => {
    if (!playerName.trim()) {
      addNotification({
        type: 'warning',
        message: 'Please enter your name to continue',
      });
      return;
    }

    createRoom(playerName, wordLength, 1, true);
  };

  const handleJoinRoom = () => {
    if (!playerName.trim()) {
      addNotification({
        type: 'warning',
        message: 'Please enter your name to continue',
      });
      return;
    }

    if (!roomCode.trim()) {
      addNotification({
        type: 'warning',
        message: 'Please enter a room code to join',
      });
      return;
    }

    joinRoom(roomCode.toUpperCase(), playerName);
  };

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 py-8'>
      <div className='max-w-md mx-auto px-4'>
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
          <h1 className='text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white'>
            Play Wordle
          </h1>

          {/* Mode Selection */}
          <div className='flex mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1'>
            <button
              onClick={() => setMode('solo')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                mode === 'solo'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}>
              Play Solo
            </button>
            <button
              onClick={() => setMode('create')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                mode === 'create'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}>
              Create Room
            </button>
            <button
              onClick={() => setMode('join')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                mode === 'join'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}>
              Join Room
            </button>
          </div>

          {/* Player Name Input */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Your Name
            </label>
            <input
              type='text'
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder='Enter your name'
              className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Word Length Selection (for both solo and create) */}
          {(mode === 'create' || mode === 'solo') && (
            <div className='mb-6'>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Word Length
              </label>
              <select
                value={wordLength}
                onChange={(e) => setWordLength(Number(e.target.value))}
                className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500'>
                <option value={4}>4 letters</option>
                <option value={5}>5 letters</option>
                <option value={6}>6 letters</option>
              </select>
            </div>
          )}

          {/* Max Players (only for create room) */}
          {mode === 'create' && (
            <div className='mb-6'>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Max Players
              </label>
              <select
                value={maxPlayers}
                onChange={(e) => setMaxPlayers(Number(e.target.value))}
                className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500'>
                <option value={2}>2 players</option>
                <option value={3}>3 players</option>
                <option value={4}>4 players</option>
                <option value={5}>5 players</option>
              </select>
            </div>
          )}

          {/* Join Room Form */}
          {mode === 'join' && (
            <div className='mb-6'>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Room Code
              </label>
              <input
                type='text'
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                placeholder='Enter 6-character room code'
                className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-center text-lg tracking-widest'
                maxLength={6}
              />
              <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
                Ask your friend for their room code
              </p>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={
              mode === 'create'
                ? handleCreateRoom
                : mode === 'solo'
                ? handlePlaySolo
                : handleJoinRoom
            }
            disabled={gameState.isLoading}
            className='w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
            {gameState.isLoading
              ? 'Loading...'
              : mode === 'create'
              ? 'Create Room'
              : mode === 'solo'
              ? 'Start Game'
              : 'Join Room'}
          </button>

          {gameState.error && (
            <p className='mt-3 text-sm text-red-600 dark:text-red-400'>
              {gameState.error}
            </p>
          )}
        </div>

        {/* How to Play */}
        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Not sure how to play?{' '}
            <Link
              to='/how-to-play'
              className='text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300'>
              Learn the rules
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayPage;
