import React from "react";
import { useState } from "react";


export default function Stats({settings,  onAdvanceSimulation}) {
    const [stats, setStats] = useState({
        totalBuns: settings.initialPopulation,
        totalLitters: 0,
        totalDeaths: 0,
        totalFights: 0,
        totalReproductions: 0,
        totalSurvivors: 0,
        months: 0,
    });
    
    return (
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
        <p>Total Buns: {stats.totalBuns}</p>
        <p>Total Litters: {stats.totalLitters}</p>
        <p>Total Deaths: {stats.totalDeaths}</p>
        <p>Total Fights: {stats.totalFights}</p>
        <p>Total Reproductions: {stats.totalReproductions}</p>
        <p>Total Survivors: {stats.totalSurvivors}</p>
        <p>Months: {stats.months}</p>
        <button id="next-step" onClick={onAdvanceSimulation}>
          Next Step
        </button>
        </div>
    );
}