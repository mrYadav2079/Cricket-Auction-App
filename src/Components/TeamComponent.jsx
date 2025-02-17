import React from "react";
import { Paper, Typography, List, ListItem, ListItemText, Avatar } from "@mui/material";

function TeamComponent({ team, teamName }) {
  return (
    <Paper elevation={3} sx={{ padding: 2, backgroundColor: "#f5f5f5" }}>
      <Typography variant="h4" gutterBottom>
        {teamName}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Remaining Purse: {team.purse.toFixed(1)} Cr
      </Typography>
      <List>
        {team.players.map((player, index) => (
          <ListItem key={index}>
            <Avatar
              src={process.env.PUBLIC_URL + player.image}
              alt={player.name}
              sx={{ marginRight: 2 }}
            />
            <ListItemText
              primary={player.name}
              secondary={`Sold for: ${player.soldFor ? player.soldFor.toFixed(1) : "N/A"} Cr`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default TeamComponent;