import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { useNotification } from '../context/NotificationContext';
import WordGrid from '../components/WordGrid';
import Keyboard from '../components/Keyboard';
import GameHeader from '../components/GameHeader';
import PlayerList from '../components/PlayerList';
import GameResults from '../components/GameResults';
import { GameStatus } from '../types';

const GamePage: React.FC = () => {
  const {
    gameState,
    makeGuess,
    addLetter,
    removeLetter,
    resetGame,
    leaveRoom,
  } = useGame();
  const { addNotification } = useNotification();
  const navigate = useNavigate();
  const [playerColors, setPlayerColors] = useState<Record<string, string>>({});

  // Redirect if no room exists
  useEffect(() => {
    if (!gameState.room) {
      navigate('/play');
    }
  }, [gameState.room, navigate]);

  // Assign colors to players
  useEffect(() => {
    if (gameState.room?.players) {
      const colors = ['#4f46e5', '#16a34a', '#ea580c', '#d946ef', '#0891b2'];
      const newPlayerColors: Record<string, string> = {};

      gameState.room.players.forEach((player, index) => {
        newPlayerColors[player.id] = colors[index % colors.length];
      });

      setPlayerColors(newPlayerColors);
    }
  }, [gameState.room?.players]);

  // Set up keyboard event listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        gameState.gameStatus !== GameStatus.WAITING &&
        gameState.gameStatus !== GameStatus.ACTIVE
      )
        return;

      if (e.key === 'Enter') {
        handleSubmitGuess();
      } else if (e.key === 'Backspace') {
        removeLetter();
      } else if (/^[A-Za-z]$/.test(e.key)) {
        addLetter(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.gameStatus, addLetter, removeLetter]);

  const handleKeyClick = (key: string) => {
    if (
      gameState.gameStatus !== GameStatus.WAITING &&
      gameState.gameStatus !== GameStatus.ACTIVE
    )
      return;

    if (key === 'ENTER') {
      handleSubmitGuess();
    } else if (key === 'BACKSPACE') {
      removeLetter();
    } else {
      addLetter(key);
    }
  };

  const handleSubmitGuess = () => {
    if (!gameState.room) return;

    if (gameState.currentAttempt.length !== gameState.room.wordLength) {
      addNotification({
        type: 'warning',
        message: `Your guess must be ${gameState.room.wordLength} letters long`,
      });
      return;
    }

    makeGuess(gameState.currentAttempt);
  };

  const copyRoomCode = () => {
    if (!gameState.room) return;

    navigator.clipboard.writeText(gameState.room.code);
    addNotification({
      type: 'success',
      message: 'Room code copied to clipboard!',
    });
  };

  const handleGoBack = () => {
    leaveRoom();
    navigate('/play');
  };

  if (!gameState.room) return null;

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 py-4 px-4'>
      <div className='max-w-lg mx-auto'>
        <GameHeader onBack={handleGoBack} />

        {/* Room Info */}
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4'>
          <div className='flex justify-between items-center'>
            <div>
              <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
                Room:
                <span
                  className='ml-2 font-mono cursor-pointer hover:text-primary-600 dark:hover:text-primary-400'
                  onClick={copyRoomCode}
                  title='Click to copy'>
                  {gameState.room.code}
                </span>
              </h2>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                Players: {gameState.room.players.length}/
                {gameState.room.maxPlayers} • Word: {gameState.room.wordLength}{' '}
                letters
              </p>
            </div>
            <div className='text-sm font-medium px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'>
              {gameState.gameStatus}
            </div>
          </div>
        </div>

        {/* Game Status Messages */}
        {gameState.gameStatus === GameStatus.WAITING && (
          <div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4 text-center'>
            <p className='text-blue-800 dark:text-blue-200'>
              Waiting for players to join...
            </p>
            <p className='text-sm text-blue-600 dark:text-blue-300 mt-1'>
              Share the room code with friends to play together!
            </p>
          </div>
        )}

        {gameState.gameStatus === GameStatus.WON && (
          <div className='bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4 text-center'>
            <p className='text-green-800 dark:text-green-200 font-medium'>
              You won! 🎉
            </p>
            <p className='text-sm text-green-600 dark:text-green-300 mt-1'>
              You guessed the word in {gameState.attempts.length}{' '}
              {gameState.attempts.length === 1 ? 'try' : 'tries'}.
            </p>
          </div>
        )}

        {gameState.gameStatus === GameStatus.LOST && (
          <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4 text-center'>
            <p className='text-red-800 dark:text-red-200 font-medium'>
              Game Over
            </p>
            <p className='text-sm text-red-600 dark:text-red-300 mt-1'>
              The word was:{' '}
              <span className='font-bold'>{gameState.room.word}</span>
            </p>
          </div>
        )}

        {/* Game Board */}
        <div className='mb-4'>
          <WordGrid
            currentAttempt={gameState.currentAttempt}
            attempts={gameState.attempts}
            evaluations={gameState.evaluations}
            wordLength={gameState.room.wordLength}
            maxAttempts={6}
          />
        </div>

        {/* Keyboard */}
        <div className='mb-6'>
          <Keyboard
            onKeyClick={handleKeyClick}
            keyboardStatus={gameState.keyboardStatus}
          />
        </div>

        {/* Players */}
        <div className='mb-6'>
          <PlayerList
            players={gameState.room.players}
            currentPlayerId={gameState.player?.id || ''}
            playerColors={playerColors}
          />
        </div>

        {/* Game Results */}
        {(gameState.gameStatus === GameStatus.WON ||
          gameState.gameStatus === GameStatus.LOST) && (
          <div className='mt-8'>
            <GameResults
              players={gameState.room.players}
              word={gameState.room.word}
              playerColors={playerColors}
            />

            <div className='mt-6 flex flex-col gap-3'>
              <button
                onClick={resetGame}
                className='w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-md font-medium transition-colors'>
                New Game
              </button>

              <button
                onClick={handleGoBack}
                className='w-full py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-md font-medium transition-colors'>
                Home
              </button>

              <p className='text-sm text-gray-500 dark:text-gray-400 text-center mt-2'>
                The room will remain active for other players.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePage;
