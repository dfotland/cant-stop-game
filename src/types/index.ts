export type Player = {
  id: number;
  name: string;
  score: number;
  currentTurnScore: number;
  isActive: boolean;
};

export type DiceRoll = {
  die1: number;
  die2: number;
  total: number;
};

export type GameState = {
  players: Player[];
  currentPlayerIndex: number;
  isGameOver: boolean;
  winningPlayerId: number | null;
  rounds: number;
};