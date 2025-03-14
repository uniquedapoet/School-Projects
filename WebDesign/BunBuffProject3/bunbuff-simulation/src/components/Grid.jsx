export default function Grid({ grid = [], settings }) {
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
        id="grid"
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
              border: "1px solid black",
              height: "60px",
              aspectRatio: "1",
            }}
          >
            {cell.buns.map((bun, bunIndex) => (
              <div
                key={bunIndex}
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
            {cell.x}, {cell.y}
          </div>
        ))}
      </div>
    </div>
  );
}
