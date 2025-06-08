import React from 'react';

interface Player {
    name: string;
    score: number;
    isActive: boolean;
}

interface PlayerPanelProps {
    players: Player[];
}

const PlayerPanel: React.FC<PlayerPanelProps> = ({ players }) => {
    return (
        <div className="player-panel">
            {players.map((player, index) => (
                <div key={index} className={`player ${player.isActive ? 'active' : ''}`}>
                    <h3>{player.name}</h3>
                    <p>Score: {player.score}</p>
                </div>
            ))}
        </div>
    );
};

export default PlayerPanel;