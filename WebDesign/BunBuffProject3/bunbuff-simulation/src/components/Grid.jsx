import React, { useState, useEffect } from "react";

export default function Grid({ gridSize }) {
  const [grid, setGrid] = useState([]); // State to store grid

  useEffect(() => {
    let tempGrid = [];

    for (let i = 0; i < gridSize.M; i++) {
      for (let j = 0; j < gridSize.N; j++) {
        tempGrid.push({ x: i, y: j, buns: [] });
      }
    }

    setGrid(tempGrid); // ✅ State update only when gridSize changes
  }, [gridSize]); // ✅ Only runs when gridSize changes

  return (
    <div
      id="grid"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: ".5rem",
    }}
    >
      <h2>Grid</h2>
      <p>Grid of buns!</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize.N}, 1fr)`,
          gap: "1px",
        }}
      >
        {grid.map((cell, index) => (
          <div
            key={index}
            style={{
              border: "1px solid black",
              height: "60px",
              aspectRatio: "1",
            }}
          >
            {cell.x}, {cell.y}
          </div>
        ))}
      </div>
    </div>
  );
}
