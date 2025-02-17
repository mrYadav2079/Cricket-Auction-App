import React from "react";
import { Paper, Typography, Grid } from "@mui/material";

function AuctionView({ teamA, teamB, currentPlayer, currentBid, currentBidder, getTeamDisplayName }) {
  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
      <Typography variant="h5" gutterBottom>
        Auction Status
      </Typography>
      {currentPlayer ? (
        <>
          <Typography variant="body1" gutterBottom>
            Current Player: {currentPlayer.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Current Bid: {currentBid.toFixed(1)} Cr by {currentBidder ? getTeamDisplayName(currentBidder) : "No one"}
          </Typography>
        </>
      ) : (
        <Typography variant="body1" gutterBottom>
          No player is currently being auctioned.
        </Typography>
      )}
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={6}>
          <Typography variant="h6">
            {getTeamDisplayName("teamA")} Purse: {teamA.purse.toFixed(1)} Cr
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">
            {getTeamDisplayName("teamB")} Purse: {teamB.purse.toFixed(1)} Cr
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default AuctionView;