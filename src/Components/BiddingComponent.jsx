import React from "react";
import { Button, Typography, Paper } from "@mui/material";

function BiddingComponent({
  currentPlayer,
  onBid,
  onSurrender,
  onPass,
  currentBid,
  currentBidder,
  user,
  getTeamDisplayName,
}) {
  const fixedBidAmount = 1; // 1 Crore

  const handleRaiseBid = () => {
    onBid(user.team, fixedBidAmount); // Pass user.team to handleBid
  };

  const handleSurrender = () => {
    // Normalize team name (convert "Team A" to "teama" and "Team B" to "teamb")
    const normalizedTeam = user.team.toLowerCase().replace(" ", "");
    onSurrender(normalizedTeam); // Pass normalized team name to handleSurrender
  };

  const handlePass = () => {
    onPass();
  };

  // Disable Surrender button if:
  // 1. The current bidder is the logged-in captain.
  // 2. There is no bid for the player (currentBid === 0).
  // 3. The player is just spun and picked (currentBidder === null).
  const isSurrenderDisabled =
    currentBidder === user.team.toLowerCase().replace(" ", "") ||
    currentBid === 0 ||
    currentBidder === null;

  // Disable Pass button after the first bid is placed
  const isPassDisabled = currentBid > currentPlayer.basePrice;

  return (
    <Paper elevation={3} sx={{ padding: 2, marginTop: 3 }}>
      <Typography variant="h5" gutterBottom>
        Bidding for {currentPlayer.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Current Bid: {currentBid.toFixed(1)} Cr by{" "}
        {currentBidder ? getTeamDisplayName(currentBidder) : "No one"}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleRaiseBid}
        sx={{ marginRight: 2 }}
      >
        Raise Bid (+1 Cr)
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleSurrender}
        disabled={isSurrenderDisabled}
        sx={{ marginRight: 2 }}
      >
        Surrender
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={handlePass}
        disabled={isPassDisabled}
      >
        Pass
      </Button>
    </Paper>
  );
}

export default BiddingComponent;