import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { useState } from "react";
import ControlPanel from "./components/ControlPanel";
import Grid from "./components/Grid";

function App() {
  //  Setup state variables for grid, log, stats, and userInputs
  const [settings, setSettings] = useState({
    gridSize: { M: 5, N: 5 },
    initialPopulation: 1,
    maxLifespan: 1,
    maxLitterSize: 1,
    minAggression: 1,
    maxAggression: 1,
  }); // object with settings
  const [grid, setGrid] = useState([]); // 2D array of objects (buns)
  const [log, setLog] = useState([]); // list of strings
  const [stats, setStats] = useState([]); // object with stats
  const [stepCount, setStepCount] = useState(); // integer

  //  Setup function to start simulation
  const startSimulation = (settings) => {
    setSettings(settings);
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
      <ControlPanel settings={settings} onStartSimulation={startSimulation} />
    </div>
    <Grid gridSize={settings.gridSize} />
  </div>
</div>

  );
}

export default App;
