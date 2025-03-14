import React, { useState, useEffect } from "react";

export default function Grid({ settings }) {
  const [grid, setGrid] = useState([]); // State to store grid
  let gridSize = settings.gridSize;
  let initialPopulation = settings.initialPopulation;

  useEffect(() => {
    let tempGrid = [];

    for (let i = 0; i < gridSize.M; i++) {
      for (let j = 0; j < gridSize.N; j++) {
        tempGrid.push({ x: i, y: j, buns: [] });
      }
    }
    // console.log(tempGrid);

    let bunsPlaced = 0;
    while (bunsPlaced < initialPopulation) {
      let randomIndex = Math.floor(Math.random() * tempGrid.length);
      if (tempGrid[randomIndex].buns.length < 2) {
        tempGrid[randomIndex].buns.push({
          id: bunsPlaced, // Unique identifier for tracking
          x: tempGrid[randomIndex].x, // Bunbuff's X position in grid
          y: tempGrid[randomIndex].y, // Bunbuff's Y position in grid
          age: 0,
          aggression: Math.floor(Math.random() * (settings.maxAggression - settings.minAggression + 1)) + settings.minAggression, 
          litterSize: Math.floor(Math.random() * (settings.maxLitterSize + 1)), 
        });
        bunsPlaced++;
      }
    }

    setGrid(tempGrid); // ✅ State update only when gridSize changes
    console.log(tempGrid);
  }, [settings]); // ✅ Only runs when gridSize changes

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
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid black",
              height: "60px",
              aspectRatio: "1",
              backgroundColor: cell.buns.length > 0 ? "#e0ffe0" : "white",
            }}
          >
            {cell.buns.map((bun) => (
              <div
                key={bun.id}
                style={{
                  fontSize: ".5rem",
                  offset: `${bun.index * 20}px`,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                🦬
              </div>
            ))}
            <div>
              {" "}
              {cell.x}, {cell.y}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
