import React from "react";
import { Paper, Typography, List, ListItem, ListItemText } from "@mui/material";

function GuestView({ teams, currentPlayer, currentBid, currentBidder, getTeamDisplayName }) {
  return (
    <Paper elevation={3} sx={{ padding: 2, marginTop: 3 }}>
      <Typography variant="h5" gutterBottom>
        Live Auction Updates
      </Typography>
      {currentPlayer ? (
        <>
          <Typography variant="body1" gutterBottom>
            Current Player: {currentPlayer.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Current Bid: {currentBid.toFixed(1)} Cr by{" "}
            {currentBidder ? getTeamDisplayName(currentBidder) : "No one"}
          </Typography>
        </>
      ) : (
        <Typography variant="body1" gutterBottom>
          No player is currently being auctioned.
        </Typography>
      )}
      <Typography variant="h6" gutterBottom>
        {getTeamDisplayName("teamA")} Players:
      </Typography>
      <List>
        {teams.teamA.players.map((player, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={player.name}
              secondary={`Bought for ${player.soldFor ? player.soldFor.toFixed(1) : "N/A"} Cr`}
            />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" gutterBottom>
        {getTeamDisplayName("teamB")} Players:
      </Typography>
      <List>
        {teams.teamB.players.map((player, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={player.name}
              secondary={`Bought for ${player.soldFor ? player.soldFor.toFixed(1) : "N/A"} Cr`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default GuestView;