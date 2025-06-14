import React, { useState } from 'react';
import './Home.css';
import Board from '../components/Board';

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

const Home = () => {
  const [dice, setDice] = useState<number[]>([]);
  const [pairings, setPairings] = useState<number[][]>([]);
  const [markers, setMarkers] = useState([
    { id: 1, column: null, position: null },
    { id: 2, column: null, position: null },
    { id: 3, column: null, position: null },
  ]);

  const handleRollDice = () => {
    const newDice = [rollDie(), rollDie(), rollDie(), rollDie()];
    setDice(newDice);
    setPairings(getPairings(newDice));
  };

  const handlePairingClick = (pair: number[]) => {
    setMarkers((prevMarkers) => {
      const updatedMarkers = [...prevMarkers];

      pair.forEach((column) => {
        const markerInColumn = updatedMarkers.find((marker) => marker.column === column);

        if (!markerInColumn) {
          const availableMarker = updatedMarkers.find((marker) => marker.column === null);
          if (availableMarker) {
            availableMarker.column = column;
            availableMarker.position = 0; // Start at the bottom
          }
        }
      });

      return updatedMarkers;
    });
  };

  return (
    <div>
      {/* Board rendering */}
      <Board COLUMN_LABELS={COLUMN_LABELS} COLUMN_HEIGHTS={COLUMN_HEIGHTS} markers={markers} />

      {/* Existing controls rendering */}
      <div className="controls">
        <div className="roll-row">
          <button className="roll-btn" onClick={handleRollDice}>Roll Dice</button>
          <div className="dice-row">
            {dice.map((die, index) => (
              <span key={index} className="die">{DiceSVGs[die - 1]}</span>
            ))}
          </div>
        </div>
        <div className="pairings">
          {pairings.map((pair, index) => (
            <div
              key={index}
              className="pair-btn"
              onClick={() => handlePairingClick(pair)}
            >
              {pair[0]} + {pair[1]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;