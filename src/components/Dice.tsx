import React, { useState } from 'react';

const Dice: React.FC = () => {
    const [diceValues, setDiceValues] = useState<number[]>([1, 1]);

    const rollDice = () => {
        const newDiceValues = [
            Math.floor(Math.random() * 6) + 1,
            Math.floor(Math.random() * 6) + 1,
        ];
        setDiceValues(newDiceValues);
    };

    return (
        <div>
            <h2>Dice Roll</h2>
            <div>
                <span>{diceValues[0]}</span> <span>{diceValues[1]}</span>
            </div>
            <button onClick={rollDice}>Roll Dice</button>
        </div>
    );
};

export default Dice;