import React from 'react';
import './Board.css'; // Import Board-specific styles

const COLUMN_LABELS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const COLUMN_HEIGHTS: Record<number, number> = {
  2: 3, 3: 5, 4: 7, 5: 9, 6: 11, 7: 13, 8: 11, 9: 9, 10: 7, 11: 5, 12: 3,
};

interface BoardProps {
  markers: { id: number; column: number | null; position: number | null }[];
}

const Board: React.FC<BoardProps> = ({ markers }) => {
  console.log('Rendering Board with markers:', markers);
  return (
    <div className="board-container">
      {/* Board rendering */}
      <div className="board">
        {COLUMN_LABELS.map((label) => (
          <div key={label} className="board-column">
            {Array.from({ length: COLUMN_HEIGHTS[label] }).map((_, i) => {
              const markerInSpace = markers.find(
                (marker) => marker.column === label && marker.position === i
              );
              return (
                <div key={i} className="board-space">
                  {markerInSpace && <span className="runner-marker">⬤</span>}
                </div>
              );
            })}
            <span className="board-label">{label}</span>
          </div>
        ))}
      </div>

      {/* Markers rendered to the right of the board */}
      <div className="board-markers">
        {markers.filter((marker) => marker.column === null).map((marker) => (
          <div key={marker.id} className="marker">⬤</div>
        ))}
      </div>
    </div>
  );
};

export default Board;