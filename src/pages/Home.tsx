import React, { useState } from 'react';
import './Home.css';

const COLUMN_LABELS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const COLUMN_HEIGHTS: Record<number, number> = {
  2: 3, 3: 5, 4: 7, 5: 9, 6: 11, 7: 13, 8: 11, 9: 9, 10: 7, 11: 5, 12: 3,
};

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function getPairings(dice: number[]) {
  if (dice.length !== 4) return [];
  const [a, b, c, d] = dice;
  return [
    [a + b, c + d],
    [a + c, b + d],
    [a + d, b + c],
  ];
}


// SVGs for dice faces 1-6
const DiceSVGs = [
  // 1
  <svg width="40" height="40" viewBox="0 0 40 40" key={1}>
    <rect width="40" height="40" rx="8" fill="#fff" stroke="#bbb" strokeWidth="2"/>
    <circle cx="20" cy="20" r="4" fill="#222"/>
  </svg>,
  // 2
  <svg width="40" height="40" viewBox="0 0 40 40" key={2}>
    <rect width="40" height="40" rx="8" fill="#fff" stroke="#bbb" strokeWidth="2"/>
    <circle cx="12" cy="12" r="4" fill="#222"/>
    <circle cx="28" cy="28" r="4" fill="#222"/>
  </svg>,
  // 3
  <svg width="40" height="40" viewBox="0 0 40 40" key={3}>
    <rect width="40" height="40" rx="8" fill="#fff" stroke="#bbb" strokeWidth="2"/>
    <circle cx="12" cy="12" r="4" fill="#222"/>
    <circle cx="20" cy="20" r="4" fill="#222"/>
    <circle cx="28" cy="28" r="4" fill="#222"/>
  </svg>,
  // 4
  <svg width="40" height="40" viewBox="0 0 40 40" key={4}>
    <rect width="40" height="40" rx="8" fill="#fff" stroke="#bbb" strokeWidth="2"/>
    <circle cx="12" cy="12" r="4" fill="#222"/>
    <circle cx="28" cy="12" r="4" fill="#222"/>
    <circle cx="12" cy="28" r="4" fill="#222"/>
    <circle cx="28" cy="28" r="4" fill="#222"/>
  </svg>,
  // 5
  <svg width="40" height="40" viewBox="0 0 40 40" key={5}>
    <rect width="40" height="40" rx="8" fill="#fff" stroke="#bbb" strokeWidth="2"/>
    <circle cx="12" cy="12" r="4" fill="#222"/>
    <circle cx="28" cy="12" r="4" fill="#222"/>
    <circle cx="20" cy="20" r="4" fill="#222"/>
    <circle cx="12" cy="28" r="4" fill="#222"/>
    <circle cx="28" cy="28" r="4" fill="#222"/>
  </svg>,
  // 6
  <svg width="40" height="40" viewBox="0 0 40 40" key={6}>
    <rect width="40" height="40" rx="8" fill="#fff" stroke="#bbb" strokeWidth="2"/>
    <circle cx="12" cy="10" r="3.5" fill="#222"/>
    <circle cx="12" cy="20" r="3.5" fill="#222"/>
    <circle cx="12" cy="30" r="3.5" fill="#222"/>
    <circle cx="28" cy="10" r="3.5" fill="#222"/>
    <circle cx="28" cy="20" r="3.5" fill="#222"/>
    <circle cx="28" cy="30" r="3.5" fill="#222"/>
  </svg>,
];

type Runners = Record<number, number>; // column -> position (0 = bottom)

const initialRunners: Runners = {};

const Home: React.FC = () => {
  const [dice, setDice] = useState<number[]>([]);
  const [pairings, setPairings] = useState<number[][]>([]);
  const [selectedPair, setSelectedPair] = useState<number[] | null>(null);
  const [runners, setRunners] = useState<Runners>(initialRunners);

  // Roll dice
  const handleRoll = () => {
    const newDice = [rollDie(), rollDie(), rollDie(), rollDie()];
    setDice(newDice);
    setPairings(getPairings(newDice));
    setSelectedPair(null);
  };

  // Choose a pair and move runners
  const handleSelectPair = (pair: number[]) => {
    setSelectedPair(pair);
    setRunners(prev => {
      const updated = { ...prev };
      pair.forEach(sum => {
        // Move runner up by 1, or start at 0 if not present
        updated[sum] = (updated[sum] ?? 0) + 1;
        // Cap at the top of the column
        if (updated[sum] > COLUMN_HEIGHTS[sum]) {
          updated[sum] = COLUMN_HEIGHTS[sum];
        }
      });
      return updated;
    });
  };

  // Stop: In a full game, this would save progress and reset runners
  const handleStop = () => {
    setRunners({});
    setDice([]);
    setPairings([]);
    setSelectedPair(null);
    // TODO: Save progress for the player
  };

  // Roll again: just roll new dice, keep runners
  const handleRollAgain = () => {
    handleRoll();
  };

  return (
    <div>
      <div className="board">
        {COLUMN_LABELS.map((label) => (
          <div key={label} className="board-column">
            {Array.from({ length: COLUMN_HEIGHTS[label] }).map((_, i) => {
              // Runner marker if runner is at this position (from bottom)
              const runnerPos = runners[label] ?? 0;
              const isRunner = runnerPos === COLUMN_HEIGHTS[label] - i;
              return (
                <div key={i} className="board-space">
                  {isRunner && <span className="runner-marker">⬤</span>}
                </div>
              );
            })}
            <span className="board-label">{label}</span>
          </div>
        ))}
      </div>
      <div className="controls">
        <div className="roll-row">
          <button className="roll-btn" onClick={handleRoll} disabled={pairings.length > 0 && !selectedPair}>
            Roll Dice
          </button>
          <div className="dice-row">
            {dice.map((d, i) => (
              <span key={i} className="die" title={d.toString()}>
                {d >= 1 && d <= 6 ? DiceSVGs[d - 1] : d}
              </span>
            ))}
          </div>
        </div>
        {pairings.length > 0 && (
          <div className="pairings">
            <div>Choose a pair:</div>
            {pairings.map((pair, idx) => (
              <button
                key={idx}
                className={`pair-btn${selectedPair === pair ? ' selected' : ''}`}
                onClick={() => handleSelectPair(pair)}
                disabled={!!selectedPair}
              >
                {pair[0]} &amp; {pair[1]}
              </button>
            ))}
          </div>
        )}
        {selectedPair && (
          <div className="after-choice-buttons">
            <button className="pair-btn" onClick={handleStop}>Stop</button>
            <button className="pair-btn" onClick={handleRollAgain}>Roll Again</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;