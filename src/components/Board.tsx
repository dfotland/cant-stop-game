import React from 'react';
import './Board.css'; // Import Board-specific styles

interface BoardProps {
  COLUMN_LABELS: number[];
  COLUMN_HEIGHTS: Record<number, number>;
  markers: { id: number; column: number | null; position: number | null }[];
}

const Board: React.FC<BoardProps> = ({ COLUMN_LABELS, COLUMN_HEIGHTS, markers }) => {
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