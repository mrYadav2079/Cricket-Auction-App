import React, { useState } from "react";
import { Button, TextField, Paper, Typography } from "@mui/material";
import users from "../Data/users.json";

function Login({ onLogin, onGuestLogin }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const user = users.find((u) => u.id === userId && u.password === password);
    if (user) {
      onLogin(user); // Pass the user object with team info
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, maxWidth: 300, margin: "auto", marginTop: 5 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>
      <TextField
        label="User ID"
        fullWidth
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" fullWidth onClick={handleLogin}>
        Login as Captain
      </Button>
      <Button variant="outlined" fullWidth onClick={onGuestLogin} sx={{ marginTop: 2 }}>
        Continue as Guest
      </Button>
    </Paper>
  );
}

export default Login;