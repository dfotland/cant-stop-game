import React from 'react';

const GameControls: React.FC<{ onStart: () => void; onRoll: () => void; onEndTurn: () => void; }> = ({ onStart, onRoll, onEndTurn }) => {
    return (
        <div className="game-controls">
            <button onClick={onStart}>Start Game</button>
            <button onClick={onRoll}>Roll Dice</button>
            <button onClick={onEndTurn}>End Turn</button>
        </div>
    );
};

export default GameControls;