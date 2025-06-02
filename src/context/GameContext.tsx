import React, { createContext, useContext, useState, useEffect } from 'react';
import { GameState, Player, TileStatus, GameStatus, GameRoom } from '../types';
import { getRandomWord, isValidWord } from '../data/words';
import Peer from 'peerjs';

// Define the context type
interface GameContextType {
  gameState: GameState;
  createRoom: (
    playerName: string,
    wordLength: number,
    maxPlayers: number,
    singlePlayer?: boolean
  ) => void;
  joinRoom: (roomCode: string, playerName: string) => void;
  makeGuess: (guess: string) => void;
  addLetter: (letter: string) => void;
  removeLetter: () => void;
  resetGame: () => void;
  leaveRoom: () => void;
}

// Initial game state
const initialGameState: GameState = {
  room: null,
  player: null,
  currentAttempt: '',
  attempts: [],
  evaluations: [],
  keyboardStatus: {},
  gameStatus: GameStatus.WAITING,
  isLoading: false,
  error: null,
};

// Create the context
const GameContext = createContext<GameContextType | undefined>(undefined);

// Custom hook to use the game context
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

// Function to evaluate a word guess
const evaluateGuess = (guess: string, answer: string): TileStatus[] => {
  const evaluation: TileStatus[] = Array(guess.length).fill('absent');
  const answerLetters = answer.split('');

  // First pass: check for correct positions
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answerLetters[i]) {
      evaluation[i] = 'correct';
      answerLetters[i] = '#'; // Mark as used
    }
  }

  // Second pass: check for present letters
  for (let i = 0; i < guess.length; i++) {
    if (evaluation[i] !== 'correct') {
      const letterIndex = answerLetters.indexOf(guess[i]);
      if (letterIndex !== -1) {
        evaluation[i] = 'present';
        answerLetters[letterIndex] = '#'; // Mark as used
      }
    }
  }

  return evaluation;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  // Save game state to localStorage (mock persistence)
  useEffect(() => {
    if (gameState.room) {
      localStorage.setItem(
        `game_${gameState.room.code}`,
        JSON.stringify(gameState)
      );
    }
  }, [gameState]);

  // Poll for updates in multiplayer mode (real-time sync)
  useEffect(() => {
    if (!gameState.room || !gameState.player || gameState.player.isHost) return;

    const intervalId = setInterval(() => {
      const roomCode = gameState.room?.code;
      if (!roomCode) return;

      const savedGame = localStorage.getItem(`game_${roomCode}`);
      if (savedGame) {
        const parsedGame = JSON.parse(savedGame) as GameState;

        // Only update if there are changes and preserve the current player's state
        if (
          parsedGame.room &&
          (parsedGame.room.players.length !== gameState.room?.players.length ||
            parsedGame.gameStatus !== gameState.gameStatus)
        ) {
          // Find current player in the updated room
          const currentPlayerId = gameState.player?.id;
          const updatedPlayer = parsedGame.room.players.find(
            (p) => p.id === currentPlayerId
          );

          if (updatedPlayer) {
            setGameState((prev) => ({
              ...parsedGame,
              player: updatedPlayer,
              currentAttempt: prev.currentAttempt,
              attempts: prev.attempts,
              evaluations: prev.evaluations,
              keyboardStatus: prev.keyboardStatus,
            }));
          }
        }
      }
    }, 2000); // Poll every 2 seconds

    return () => clearInterval(intervalId);
  }, [gameState.room, gameState.player]);

  // WebRTC Configuration
  const iceServers = {
    iceServers: [
      { urls: 'stun:stun.services.mozilla.com' },
      { urls: 'stun:stun.stunprotocol.org:3478' },
    ],
  };

  // Initialize with error handling
  const initializePeer = (roomId: string) => {
    try {
      const peer = new Peer({
        config: iceServers,
        host: '0.peerjs.com',
        port: 443,
        secure: true,
      });

      peer.on('open', (id) => {
        // Connect peers in the room
        if (gameState.room) {
          gameState.room.players.forEach((player) => {
            if (player.id !== id && player.peerId) {
              const conn = peer.connect(player.peerId);
              conn.on('open', () => {
                conn.send(
                  JSON.stringify({
                    type: 'SYNC_STATE',
                    payload: gameState,
                  })
                );
              });
            }
          });
        }
      });

      peer.on('connection', (conn) => {
        conn.on('data', (data) => {
          const message = JSON.parse(data);
          if (message.type === 'SYNC_STATE') {
            setGameState((prev) => ({
              ...prev,
              ...message.payload,
              players: message.payload.players,
            }));
          }
        });
      });
    } catch (error) {
      console.error('PeerJS initialization failed:', error);
    }
  };

  const generateRoomCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let roomCode = '';
    for (let i = 0; i < 6; i++) {
      roomCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return roomCode;
  };

  const createRoom = (
    playerName: string,
    wordLength: number,
    maxPlayers: number,
    singlePlayer?: boolean
  ) => {
    const roomId = generateRoomCode();
    initializePeer(roomId);
    setGameState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    // Mock API call
    setTimeout(() => {
      const playerId = Math.random().toString(36).substring(2, 10);
      const player: Player = {
        id: playerId,
        name: playerName,
        isHost: true,
        score: 0,
        guessCount: 0,
        peerId: playerId,
      };

      // Choose a random word
      const randomWord = getRandomWord(wordLength);

      if (singlePlayer) {
        // For single player, we don't need to create a room in localStorage
        setGameState({
          room: {
            code: 'SOLO',
            hostId: playerId,
            players: [player],
            maxPlayers: 1,
            status: 'active',
            word: randomWord,
            wordLength,
            createdAt: new Date().toISOString(),
          },
          player: player,
          currentAttempt: '',
          attempts: [],
          evaluations: [],
          keyboardStatus: {},
          gameStatus: GameStatus.ACTIVE,
          isLoading: false,
          error: null,
        });
        return;
      }

      // For multiplayer, create a room with a code
      // Generate a more readable room code (6 characters, avoiding confusing letters)
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let roomCode = '';
      for (let i = 0; i < 6; i++) {
        roomCode += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      const newRoom: GameRoom = {
        code: roomCode,
        hostId: playerId,
        players: [player],
        maxPlayers: maxPlayers,
        status: 'waiting',
        word: randomWord,
        wordLength,
        createdAt: new Date().toISOString(),
      };

      // Save room to gameRooms in localStorage for discovery
      const existingRooms = JSON.parse(
        localStorage.getItem('gameRooms') || '{}'
      );
      existingRooms[roomCode] = newRoom;
      localStorage.setItem('gameRooms', JSON.stringify(existingRooms));

      setGameState({
        room: newRoom,
        player: player,
        currentAttempt: '',
        attempts: [],
        evaluations: [],
        keyboardStatus: {},
        gameStatus: GameStatus.WAITING,
        isLoading: false,
        error: null,
      });
    }, 1000);
  };

  const joinRoom = (roomCode: string, playerName: string) => {
    setGameState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    // Mock API call
    setTimeout(() => {
      // Check if room exists in localStorage (mock persistence)
      const existingRooms = JSON.parse(
        localStorage.getItem('gameRooms') || '{}'
      );
      let room = existingRooms[roomCode];

      if (!room) {
        setGameState((prev) => ({
          ...prev,
          isLoading: false,
          error: 'Room not found. Please check the room code.',
        }));
        return;
      }

      // Check if room is single player
      if (room.maxPlayers === 1) {
        setGameState((prev) => ({
          ...prev,
          isLoading: false,
          error: 'This is a single-player game and cannot be joined.',
        }));
        return;
      }

      // Check if player name already exists in the room
      if (room.players.some((p) => p.name === playerName)) {
        setGameState((prev) => ({
          ...prev,
          isLoading: false,
          error:
            'A player with this name already exists in the room. Please choose a different name.',
        }));
        return;
      }

      // Add player if room has space
      if (room.players.length < room.maxPlayers) {
        const playerId = Math.random().toString(36).substring(2, 10);
        const player: Player = {
          id: playerId,
          name: playerName,
          isHost: false,
          score: 0,
          guessCount: 0,
          peerId: playerId,
        };

        room.players.push(player);
        room.status = room.players.length >= 2 ? 'active' : 'waiting';

        // Save updated room
        existingRooms[roomCode] = room;
        localStorage.setItem('gameRooms', JSON.stringify(existingRooms));

        // Get any existing game state for this room
        const savedGameState = localStorage.getItem(`game_${roomCode}`);
        let gameStatus =
          room.players.length >= 2 ? GameStatus.ACTIVE : GameStatus.WAITING;

        setGameState({
          room,
          player,
          currentAttempt: '',
          attempts: [],
          evaluations: [],
          keyboardStatus: {},
          gameStatus,
          isLoading: false,
          error: null,
        });
      } else {
        setGameState((prev) => ({
          ...prev,
          isLoading: false,
          error: 'Room is full',
        }));
      }
    }, 1000);
  };

  const makeGuess = (guess: string) => {
    if (!gameState.room || gameState.gameStatus !== GameStatus.ACTIVE) return;

    // Allow any word as an attempt, even if it's not in our dictionary
    // This is a change from the previous behavior where we required valid words
    // Removed the isValidWord check

    const answer = gameState.room.word;

    // Evaluate the guess
    const evaluation = evaluateGuess(guess, answer);

    // Update keyboard status
    const newKeyboardStatus = { ...gameState.keyboardStatus };
    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i];
      const status = evaluation[i];

      // Only upgrade status (absent -> present -> correct)
      if (
        !newKeyboardStatus[letter] ||
        (newKeyboardStatus[letter] === 'absent' &&
          (status === 'present' || status === 'correct')) ||
        (newKeyboardStatus[letter] === 'present' && status === 'correct')
      ) {
        newKeyboardStatus[letter] = status;
      }
    }

    // Update attempts and evaluations
    const newAttempts = [...gameState.attempts, guess];
    const newEvaluations = [...gameState.evaluations, evaluation];

    // Update player
    const updatedPlayer = { ...gameState.player! };
    updatedPlayer.guessCount += 1;

    // Check for win or loss
    const isWin = evaluation.every((status) => status === 'correct');
    const isLoss = newAttempts.length >= 6 && !isWin;

    // Update score if won
    if (isWin) {
      updatedPlayer.score += Math.max(1, 7 - newAttempts.length); // More points for fewer attempts
    }

    // Update game status
    const newGameStatus = isWin
      ? GameStatus.WON
      : isLoss
      ? GameStatus.LOST
      : GameStatus.ACTIVE;

    // Update room players
    const updatedRoom = { ...gameState.room };
    updatedRoom.players = updatedRoom.players.map((p) =>
      p.id === updatedPlayer.id ? updatedPlayer : p
    );

    const newState = {
      ...gameState,
      room: updatedRoom,
      player: updatedPlayer,
      attempts: newAttempts,
      evaluations: newEvaluations,
      keyboardStatus: newKeyboardStatus,
      currentAttempt: '',
      gameStatus: newGameStatus,
      error: null,
    };

    setGameState(newState);

    // Update the game state in localStorage for real-time sync
    if (gameState.room && gameState.room.code !== 'SOLO') {
      localStorage.setItem(
        `game_${gameState.room.code}`,
        JSON.stringify(newState)
      );
    }
  };

  const addLetter = (letter: string) => {
    if (!gameState.room || gameState.gameStatus !== GameStatus.ACTIVE) return;
    if (gameState.currentAttempt.length >= gameState.room.wordLength) return;

    setGameState((prev) => ({
      ...prev,
      currentAttempt: prev.currentAttempt + letter.toUpperCase(),
    }));
  };

  const removeLetter = () => {
    if (!gameState.room || gameState.gameStatus !== GameStatus.ACTIVE) return;
    if (gameState.currentAttempt.length === 0) return;

    setGameState((prev) => ({
      ...prev,
      currentAttempt: prev.currentAttempt.slice(0, -1),
    }));
  };

  const resetGame = () => {
    if (!gameState.room) return;

    // Choose a new random word
    const newWord = getRandomWord(gameState.room.wordLength);

    // Update the room with the new word
    const updatedRoom = { ...gameState.room, word: newWord };

    // Reset player guess count
    const updatedPlayers = updatedRoom.players.map((p) => ({
      ...p,
      guessCount: 0,
    }));
    updatedRoom.players = updatedPlayers;

    // Reset the player
    const updatedPlayer = { ...gameState.player!, guessCount: 0 };

    const newState = {
      ...gameState,
      room: updatedRoom,
      player: updatedPlayer,
      currentAttempt: '',
      attempts: [],
      evaluations: [],
      keyboardStatus: {},
      gameStatus: GameStatus.ACTIVE,
      error: null,
    };

    setGameState(newState);

    // Update the game state in localStorage for real-time sync
    if (gameState.room.code !== 'SOLO') {
      localStorage.setItem(
        `game_${updatedRoom.code}`,
        JSON.stringify(newState)
      );
    }
  };

  const leaveRoom = () => {
    if (gameState.room && gameState.player) {
      // Remove player from room if not single player
      if (gameState.room.code !== 'SOLO' && gameState.room.maxPlayers > 1) {
        const existingRooms = JSON.parse(
          localStorage.getItem('gameRooms') || '{}'
        );
        const room = existingRooms[gameState.room.code];

        if (room) {
          // If player is host, assign host to next player or remove room
          if (gameState.player.isHost) {
            const remainingPlayers = room.players.filter(
              (p) => p.id !== gameState.player?.id
            );

            if (remainingPlayers.length > 0) {
              // Assign new host
              remainingPlayers[0].isHost = true;
              room.hostId = remainingPlayers[0].id;
              room.players = remainingPlayers;
              existingRooms[gameState.room.code] = room;
            } else {
              // Remove room if no players left
              delete existingRooms[gameState.room.code];
              localStorage.removeItem(`game_${gameState.room.code}`);
            }
          } else {
            // Just remove the player
            room.players = room.players.filter(
              (p) => p.id !== gameState.player?.id
            );
            existingRooms[gameState.room.code] = room;
          }

          localStorage.setItem('gameRooms', JSON.stringify(existingRooms));
        }
      }
    }

    setGameState(initialGameState);
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        joinRoom,
        createRoom,
        makeGuess,
        addLetter,
        removeLetter,
        resetGame,
        leaveRoom,
      }}>
      {children}
    </GameContext.Provider>
  );
};
