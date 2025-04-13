// import React from "react";
// import { useState } from "react";

// export default function Log({ updateLog }) {
//   const [log, setLog] = useState([]);

//   const updateLog = (newLog) => {
//     setLog(...(prevLog) => [...prevLog, newLog]);
//   };

//   return (
//     <div
//       id="Log"
    //   style={{
    //     display: "flex",
    //     textAlign: "left",
    //     alignContent: "left",
    //     alignItems: "left",
    //     flexDirection: "column",
    //     width: "25%",
    //     backgroundColor: "#f9f9f9", 
    //     gap: ".5rem",
    //     margin: "1rem",
    //   }}
//     >
//       <h2>Game Log</h2>
//       {log.map((message, index) => (
//         <p key={index}>{message}</p>
//       ))}
//     </div>
//   );
// }
