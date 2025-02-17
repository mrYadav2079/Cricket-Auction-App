import React from "react";
import { AppBar, Toolbar, Typography, Button, Avatar, Box } from "@mui/material";

function TopBar({ user, onLogout, getCaptainDisplayName }) {
  return (
    <AppBar position="static" sx={{ marginBottom: 3 }}>
      <Toolbar>
        {/* Display captain's name and photo */}
        {user && user.id !== "guest" && (
          <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
            <Avatar
              src={process.env.PUBLIC_URL + user.photo}
              alt={user.id}
              sx={{ width: 40, height: 40, marginRight: 2 }}
            />
            <Typography variant="h6" component="div">
              {getCaptainDisplayName(user.id)}
            </Typography>
          </Box>
        )}

        {/* Display "Guest" if no user is logged in */}
        {!user && (
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Guest
          </Typography>
        )}

        {/* Logout button for logged-in users */}
        {user && user.id !== "guest" && (
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;