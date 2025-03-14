import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { useState } from "react";
import ControlPanel from "./Components/ControlPanel";
import Grid from "./Components/Grid";
import Stats from "./Components/stats";

function App() {
  const [settings, setSettings] = useState({
    gridSize: { M: 5, N: 5 },
    initialPopulation: 1,
    maxLifespan: 1,
    maxLitterSize: 1,
    minAggression: 1,
    maxAggression: 1,
  });
  const [monthCount, setMonthCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [grid, setGrid] = useState([]); // ✅ Store grid in App.js

  const startSimulation = (newSettings) => {
    setSettings(newSettings);
    setIsRunning(true);
    const newGrid = initializeGrid(newSettings);
    setGrid(newGrid);
  };

  // Function to generate the grid
  const initializeGrid = (settings) => {
    let tempGrid = [];

    for (let i = 0; i < settings.gridSize.M; i++) {
      for (let j = 0; j < settings.gridSize.N; j++) {
        tempGrid.push({ x: i, y: j, buns: [] });
      }
    }

    let bunsPlaced = 0;
    while (bunsPlaced < settings.initialPopulation) {
      let randomIndex = Math.floor(Math.random() * tempGrid.length);
      if (tempGrid[randomIndex].buns.length < 2) {
        tempGrid[randomIndex].buns.push({
          id: bunsPlaced,
          x: tempGrid[randomIndex].x,
          y: tempGrid[randomIndex].y,
          age: 0,
          aggression:
            Math.floor(
              Math.random() *
                (settings.maxAggression - settings.minAggression + 1)
            ) + settings.minAggression,
          litterSize: Math.floor(Math.random() * (settings.maxLitterSize + 1)),
        });
        bunsPlaced++;
      }
    }

    return tempGrid; // ✅ Return the grid so we can set it in App.js
  };

  const advanceSimulation = () => {
    console.log("Advancing simulation to next step...");
    setMonthCount((prev) => prev + 1);
  };

  return (
    <div className="App">
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#333", // Dark banner
          color: "white",
          padding: "20px",
          fontSize: "24px",
          fontWeight: "bold",
          width: "100%", // Full width
        }}
      >
        <h1>BunBuff Simulation</h1>
        <p>Welcome to the BunBuff Simulation!</p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start", // Align to top
          gap: "40px", // Space between Control Panel & Grid
          padding: "20px",
          maxWidth: "90vw", // Limits stretching
          margin: "0 auto", // Centers the layout
        }}
      >
        <div
          style={{
            width: "250px",
            padding: "20px",
            border: "1px solid black",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
          }}
        >
          {!isRunning ? (
            <ControlPanel
              settings={settings}
              onStartSimulation={startSimulation}
            />
          ) : (
            <Stats
              settings={settings}
              onAdvanceSimulation={advanceSimulation}
            />
          )}
        </div>
        {!!isRunning ?(<div
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
              gridTemplateColumns: `repeat(${settings.gridSize.N}, 1fr)`,
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
        </div>): null
        }
      </div>
    </div>
  );
}

export default App;
