import React from "react";
import { useState } from "react";

export default function ControlPanel({ settings, onStartSimulation }) {
  const [gridSize, setGridSize] = useState(settings.gridSize);
  const [initialPopulation, setInitialPopulation] = useState(
    settings.initialPopulation
  );
  const [maxLifespan, setMaxLifespan] = useState(settings.maxLifespan);
  const [maxLitterSize, setMaxLitterSize] = useState(settings.maxLitterSize);
  const [minAggression, setMinAggression] = useState(settings.minAggression);
  const [maxAggression, setMaxAggression] = useState(settings.maxAggression);

  console.log(onStartSimulation);

  const startSimulation = (event) => {
    event.preventDefault();

    if (
      gridSize.M <= 0 ||
      gridSize.N <= 0 ||
      gridSize.M > 20 ||
      gridSize.N > 20 ||
      initialPopulation <= 0 ||
      maxLifespan <= 0 ||
      maxLitterSize <= 0 ||
      minAggression < 1 ||
      minAggression > 99 ||
      maxAggression < 1 ||
      maxAggression > 99
    ) {
      alert("Please enter valid inputs");
      return;
    }

    onStartSimulation({
      gridSize,
      initialPopulation,
      maxLifespan,
      maxLitterSize,
      minAggression,
      maxAggression,
    });
  };

  return (
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
      <button id="start-simulation" onClick={startSimulation}>
        Start Simulation
      </button>
    </div>
  );
}

// (1) the size of the initial population of bunbuffs,
// (2) the maximum lifespan of a bunbuff in months (which is the same for every bunbuff),
// (3) the maximum size of a bunbuff litter,
// (4) the minimum aggression level of a bunbuff, and
// (5) the maximum aggression level of a bunbuff.
// Note that to prevent user error, you should make sure that the user can only enter positive integers for each of these simulation parameters.
// Furthermore, for parameters (4) and (5), you should make sure that the number is between 1 and 99, inclusive.
