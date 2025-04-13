import React from "react";
import { useState } from "react";
// Add Restart Function
// Create Design Doc

function App() {
  const [settings, setSettings] = useState({
    gridSize: { M: 5, N: 5 },
    initialPopulation: 1,
    maxLifespan: 10,
    maxLitterSize: 1,
    minAggression: 1,
    maxAggression: 99,
  });
  const [monthCount, setMonthCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [log, setLog] = useState([]);
  const [grid, setGrid] = useState([]);
  const [gridSize, setGridSize] = useState(settings.gridSize);
  const [initialPopulation, setInitialPopulation] = useState(
    settings.initialPopulation
  );
  const [maxLifespan, setMaxLifespan] = useState(settings.maxLifespan);
  const [maxLitterSize, setMaxLitterSize] = useState(settings.maxLitterSize);
  const [minAggression, setMinAggression] = useState(settings.minAggression);
  const [maxAggression, setMaxAggression] = useState(settings.maxAggression);

  const [stats, setStats] = useState({
    Month: monthCount,
    totalBuns: settings.initialPopulation,
    bunsAlive: settings.initialPopulation,
    averageLifeSpan: 0,
    averageBirths: 0,
    averageDeaths: 0,
  });

  function startSimulation(newSettings) {
    if (
      newSettings.gridSize.M <= 0 ||
      newSettings.gridSize.N <= 0 ||
      newSettings.gridSize.M > 20 ||
      newSettings.gridSize.N > 20 ||
      newSettings.initialPopulation <= 0 ||
      newSettings.maxLifespan <= 0 ||
      newSettings.maxLitterSize <= 0 ||
      newSettings.minAggression < 1 ||
      newSettings.minAggression > 99 ||
      newSettings.maxAggression < 1 ||
      newSettings.maxAggression > 99
    ) {
      alert("Please enter valid inputs");
      return;
    }
    setMonthCount(1); // Fix: Ensure month count resets before other state updates.
    setSettings(newSettings);
    setStats({
      Month: 1,
      totalBuns: newSettings.initialPopulation,
      bunsAlive: newSettings.initialPopulation,
      averageLifeSpan: 0,
      averageBirths: 0,
      averageDeaths: 0,
    });
    setIsRunning(true);
    const newGrid = initializeGrid(newSettings);
    setGrid(newGrid);
    updateLog("Simulation started, Month: 1"); // Fix: Ensure correct month logs
  }

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
          litterSize: settings.maxLitterSize,
        });
        bunsPlaced++;
      }
    }

    return tempGrid;
  };

  const moveBuns = () => {
    let updatedGrid = grid.map((cell) => ({
      ...cell,
      buns: [],
    }));

    for (let cell of grid) {
      for (let bun of cell.buns) {
        let newX = bun.x + Math.floor(Math.random() * 3) - 1;
        let newY = bun.y + Math.floor(Math.random() * 3) - 1;

        if (
          newX < 0 ||
          newX >= settings.gridSize.M ||
          newY < 0 ||
          newY >= settings.gridSize.N
        ) {
          newX = bun.x;
          newY = bun.y;
        }

        let newCell = updatedGrid.find((c) => c.x === newX && c.y === newY);

        if (newCell.buns.length < 2) {
          newCell.buns.push({ ...bun, x: newX, y: newY });
        } else {
          let originalCell = updatedGrid.find(
            (c) => c.x === bun.x && c.y === bun.y
          );
          originalCell.buns.push(bun);
        }
      }
    }

    setGrid(updatedGrid);
  };

  const findAdjacentCells = (x, y, grid) => {
    const directions = [
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 },
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 },
    ];

    let adjacentCells = [];

    for (let { dx, dy } of directions) {
      let newX = x + dx;
      let newY = y + dy;

      if (
        newX >= 0 &&
        newX < settings.gridSize.M &&
        newY >= 0 &&
        newY < settings.gridSize.N
      ) {
        let cell = grid.find((c) => c.x === newX && c.y === newY);
        if (cell) {
          adjacentCells.push(cell);
        }
      }
    }

    return adjacentCells;
  };

  const simulateMonth = () => {
    let newGrid = grid.map((cell) => ({
      ...cell,
      buns: [...cell.buns],
    }));

    let totalDeaths = 0;
    let totalBirths = 0;

    for (let i = 0; i < newGrid.length; i++) {
      let cell = newGrid[i];
      cell.buns = cell.buns.filter((bun) => {
        let deathFromNaturalCauses =
          bun.age / settings.maxLifespan > Math.random();
        if (deathFromNaturalCauses) {
          totalDeaths++;
          updateLog(`Bun at (${bun.x}, ${bun.y}) died of natural causes`);
          return false;
        }
        bun.age++;
        return true;
      });
      if (cell.buns.length > 1) {
        let bun1 = cell.buns[0];
        let bun2 = cell.buns[1];

        let bun1Aggression = Math.random() < bun1.aggression / 100;
        let bun2Aggression = Math.random() < bun2.aggression / 100;

        if (bun1Aggression && bun2Aggression) {
          cell.buns = [];
          totalDeaths += 2;
          updateLog(`Fight at (${bun1.x}, ${bun1.y}) - Both buns died.`);
        } else if (bun1Aggression) {
          cell.buns = cell.buns.filter((b) => b.id !== bun2.id);
          totalDeaths += 1;
          updateLog(`Bun death at (${bun1.x}, ${bun1.y}) .`);
        } else if (bun2Aggression) {
          cell.buns = cell.buns.filter((b) => b.id !== bun1.id);
          totalDeaths += 1;
          updateLog(`Bun death at (${bun2.x}, ${bun2.y}).`);
        }
      }

      if (cell.buns.length === 2) {
        let bun1 = cell.buns[0];
        let bun2 = cell.buns[1];

        if (bun1 && bun2 && bun1.age > 5 && bun2.age > 5) {
          let adjacentCells = findAdjacentCells(cell.x, cell.y, newGrid);
          let availableCells = adjacentCells.filter((c) => c.buns.length < 2);

          if (availableCells.length > 0) {
            let litterSize = Math.min(
              settings.maxLitterSize,
              availableCells.length
            );
            for (let j = 0; j < litterSize; j++) {
              let targetCell = availableCells[j];
              let newBun = {
                id: stats.totalBuns + totalBirths,
                x: targetCell.x,
                y: targetCell.y,
                age: 0,
                aggression:
                  Math.floor(
                    Math.random() *
                      (settings.maxAggression - settings.minAggression + 1)
                  ) + settings.minAggression,
                litterSize: settings.maxLitterSize,
              };
              updateLog(
                `Bun birth at (${newBun.x}, ${newBun.y}) - Litter size: ${litterSize}`
              );
              targetCell.buns.push(newBun);
              totalBirths++;
            }
          }
        }
      }
    }

    setStats((prevStats) => ({
      ...prevStats,
      bunsAlive: prevStats.bunsAlive - totalDeaths + totalBirths,
      totalBuns: prevStats.totalBuns + totalBirths,
      averageLifeSpan: (prevStats.averageLifeSpan + totalDeaths) / monthCount,
      averageBirths: (prevStats.averageBirths + totalBirths) / monthCount,
    }));

    setGrid(newGrid);
  };

  const advanceSimulation = () => {
    setMonthCount((prev) => prev + 1);
    simulateMonth();
  };

  const updateLog = (newMessage) => {
    setLog((prevLog) => [...prevLog, `Month: ${monthCount}: ${newMessage}`]);
  };

  return (
    <div className="App">
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#333",
          color: "white",
          padding: "20px",
          fontSize: "24px",
          fontWeight: "bold",
          width: "100%",
        }}
      >
        <h1>BunBuff Simulation</h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "40px",
          padding: "20px",
          maxWidth: "90vw",
          margin: "0 auto",
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
            <div
              id="ControlPanel"
              style={{
                display: "flex",
                textAlign: "left",
                flexDirection: "column",
                gap: ".5rem",
                margin: "2rem",
              }}
            >
              <h2>Control Panel</h2>
              <p>Set initial game inputs!</p>
              <label>
                Grid Size:
                <input
                  type="number"
                  value={gridSize.N}
                  placeholder="N"
                  onChange={(input) =>
                    setGridSize({ ...gridSize, N: input.target.value })
                  }
                />
                <input
                  type="number"
                  value={gridSize.M}
                  placeholder="M"
                  onChange={(input) =>
                    setGridSize({ ...gridSize, M: input.target.value })
                  }
                />
              </label>
              <label>
                Initial Population
                <input
                  type="number"
                  value={initialPopulation}
                  placeholder="Initial Population"
                  onChange={(e) => setInitialPopulation(e.target.value)}
                />
              </label>
              <label>
                Max Lifespan
                <input
                  type="number"
                  value={maxLifespan}
                  placeholder="Max Lifespan"
                  onChange={(e) => setMaxLifespan(e.target.value)}
                />
              </label>
              <label>
                Max Litter Size
                <input
                  type="number"
                  value={maxLitterSize}
                  placeholder="Max Litter Size"
                  onChange={(e) => setMaxLitterSize(e.target.value)}
                />
              </label>
              <label>
                Aggression
                <input
                  type="number"
                  value={minAggression}
                  placeholder="Min Aggression"
                  onChange={(e) => setMinAggression(e.target.value)}
                />
                <input
                  type="number"
                  value={maxAggression}
                  placeholder="Max Aggression"
                  onChange={(e) => setMaxAggression(e.target.value)}
                />
              </label>
              <button
                id="start-simulation"
                onClick={() =>
                  startSimulation({
                    gridSize,
                    initialPopulation,
                    maxLifespan,
                    maxLitterSize,
                    minAggression,
                    maxAggression,
                  })
                }
              >
                Start Simulation
              </button>
            </div>
          ) : (
            <div
              id="Stats"
              style={{
                display: "flex",
                textAlign: "left",
                flexDirection: "column",
                gap: ".5rem",
                margin: "2rem",
              }}
            >
              <h2>Stats</h2>
              <p>Month: {monthCount}</p>
              <p>Total Buns: {stats.totalBuns}</p>
              <p>Buns Alive: {stats.bunsAlive}</p>
              <p>Average Life Span: {stats.averageLifeSpan}</p>
              <p>Average Births: {stats.averageBirths}</p>
              <button id="next-step" onClick={moveBuns}>
                Move
              </button>
              <button id="next-step" onClick={advanceSimulation}>
                Fight, Reproduce & Advance Month
              </button>
            </div>
          )}
        </div>
        {isRunning ? (
          <div
            style={{
              display: "flex",
              textAlign: "left",
              alignContent: "left",
              alignItems: "left",
              flexDirection: "column",
              width: "25%",
              backgroundColor: "#f9f9f9",
              gap: ".5rem",
              margin: "1rem",
              height: "600px",
              overflowY: "scroll",
            }}
          >
            <h2>Game Log</h2>
            {log
              .slice()
              .reverse()
              .map((message, index) => (
                <p key={index}>{message}</p>
              ))}
          </div>
        ) : null}
        {!!isRunning ? (
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
        ) : null}
      </div>
    </div>
  );
}

export default App;
