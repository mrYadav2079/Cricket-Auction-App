import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { motion } from "framer-motion";

function SpinnerComponent({ players, onSpin, isSpinnerDisabled, teamA, teamB, passedPlayers }) {
  const [spinning, setSpinning] = useState(false);

  // Combine all picked players from teamA and teamB
  const pickedPlayers = [...teamA.players, ...teamB.players];

  // Filter out picked and passed players
  const availablePlayers = Object.values(players)
    .flat()
    .filter(
      (player) =>
        !pickedPlayers.some((p) => p.name === player.name) &&
        !passedPlayers.some((p) => p.name === player.name)
    );

  const spin = () => {
    setSpinning(true);
    setTimeout(() => {
      if (availablePlayers.length > 0) {
        const randomPlayer = availablePlayers[Math.floor(Math.random() * availablePlayers.length)];
        onSpin(randomPlayer);
      } else {
        alert("No players available to spin!");
      }
      setSpinning(false);
    }, 2000); // Simulate a 2-second spin
  };

  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={spin}
        disabled={isSpinnerDisabled || spinning || availablePlayers.length === 0}
      >
        {spinning ? "Spinning..." : "Spin to Pick a Player"}
      </Button>
      {spinning && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ fontSize: "24px", marginTop: "10px" }}
        >
          🏏
        </motion.div>
      )}
    </div>
  );
}

export default SpinnerComponent;