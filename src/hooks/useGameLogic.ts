import { useState, useEffect } from 'react';
import { Player, GameState, DiceRoll } from '../types';

const useGameLogic = (numPlayers: number) => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [gameState, setGameState] = useState<GameState>('waiting');
    const [diceRoll, setDiceRoll] = useState<DiceRoll | null>(null);

    useEffect(() => {
        initializePlayers(numPlayers);
    }, [numPlayers]);

    const initializePlayers = (num: number) => {
        const initialPlayers = Array.from({ length: num }, (_, index) => ({
            id: index,
            score: 0,
            isActive: index === 0,
        }));
        setPlayers(initialPlayers);
    };

    const rollDice = () => {
        const roll1 = Math.floor(Math.random() * 6) + 1;
        const roll2 = Math.floor(Math.random() * 6) + 1;
        setDiceRoll({ roll1, roll2 });
        updatePlayerScore(roll1 + roll2);
    };

    const updatePlayerScore = (points: number) => {
        setPlayers(prevPlayers => {
            const updatedPlayers = [...prevPlayers];
            updatedPlayers[currentPlayerIndex].score += points;
            return updatedPlayers;
        });
    };

    const nextPlayer = () => {
        setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
    };

    const startGame = () => {
        setGameState('playing');
        setCurrentPlayerIndex(0);
        setPlayers(prevPlayers => prevPlayers.map(player => ({ ...player, score: 0 })));
    };

    return {
        players,
        currentPlayerIndex,
        gameState,
        diceRoll,
        rollDice,
        nextPlayer,
        startGame,
    };
};

export default useGameLogic;