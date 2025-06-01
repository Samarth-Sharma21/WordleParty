// Game status enum
export enum GameStatus {
  WAITING = 'waiting',
  ACTIVE = 'active',
  WON = 'won',
  LOST = 'lost',
}

// Tile status for letter evaluations
export type TileStatus = 'correct' | 'present' | 'absent' | 'empty';

// Player type
export interface Player {
  id: string;
  name: string;
  isHost: boolean;
  score: number;
  guessCount: number;
}

// Game room type
export interface GameRoom {
  code: string;
  hostId: string;
  players: Player[];
  maxPlayers: number;
  status: string;
  word: string;
  wordLength: number;
  createdAt: string;
}

// Game state type
export interface GameState {
  room: GameRoom | null;
  player: Player | null;
  currentAttempt: string;
  attempts: string[];
  evaluations: TileStatus[][];
  keyboardStatus: Record<string, TileStatus>;
  gameStatus: GameStatus;
  isLoading: boolean;
  error: string | null;
}

// Notification type
export interface Notification {
  id?: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  duration?: number;
}
