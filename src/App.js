import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Paper } from "@mui/material";
import playersData from "./Data/players.json";
import users from "./Data/users.json"; // Import users data
import config from "./Data/config.json"; // Import config data
import Login from "./Components/Login";
import TeamComponent from "./Components/TeamComponent";
import SpinnerComponent from "./Components/SpinnerComponent";
import BiddingComponent from "./Components/BiddingComponent";
import AuctionView from "./Components/AuctionView";
import TopBar from "./Components/TopBar"; // Import the TopBar component

function App() {
  const [user, setUser] = useState(null);
  const [teamA, setTeamA] = useState({ players: [], purse: 100 });
  const [teamB, setTeamB] = useState({ players: [], purse: 100 });
  const [auctionState, setAuctionState] = useState({ currentPlayer: null, currentBid: 0, currentBidder: null });
  const [passedPlayers, setPassedPlayers] = useState([]);
  const [allPlayers, setAllPlayers] = useState(playersData);

  // Fetch initial data from json-server
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch teamA data
      const teamAResponse = await fetch("http://localhost:3001/teamA");
      const teamAData = await teamAResponse.json();
      setTeamA(teamAData);

      // Fetch teamB data
      const teamBResponse = await fetch("http://localhost:3001/teamB");
      const teamBData = await teamBResponse.json();
      setTeamB(teamBData);

      // Fetch auctionState data
      const auctionStateResponse = await fetch("http://localhost:3001/auctionState");
      const auctionStateData = await auctionStateResponse.json();
      setAuctionState(auctionStateData);

      // Fetch auctionData and extract passedPlayers
      const auctionDataResponse = await fetch("http://localhost:3001/auctionData");
      const auctionData = await auctionDataResponse.json();
      setPassedPlayers(auctionData.passedPlayers);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Reset passedPlayers after all players are picked
  useEffect(() => {
    const allPlayersCount = Object.values(allPlayers).flat().length;
    const pickedPlayersCount = teamA.players.length + teamB.players.length;

    // If all players have been picked, reset passedPlayers
    if (pickedPlayersCount === allPlayersCount) {
      setPassedPlayers([]);
    }
  }, [teamA.players, teamB.players, allPlayers]);

  const handleLogin = (loggedInUser) => {
    // Find the user in users.json to get the photo
    const userData = users.find((u) => u.id === loggedInUser.id);
    setUser({ ...loggedInUser, photo: userData?.photo });
  };

  const handleLogout = () => {
    setUser(null); // Log out the user
  };

  // Get display names from config
  const getTeamDisplayName = (team) => {
    return config.teams[team]?.displayName || team;
  };

  const getCaptainDisplayName = (captain) => {
    const team = captain === "captainA" ? "teamA" : "teamB";
    return config.teams[team]?.captain[captain]?.displayName || captain;
  };

  const handleBid = async (team, bidAmount) => {
    let updatedTeamA = { ...teamA };
    let updatedTeamB = { ...teamB };

    // Normalize team names (convert "Team A" to "teama" and "Team B" to "teamb")
    const normalizedTeam = team.toLowerCase().replace(" ", "");

    // Check if the team is valid
    if (normalizedTeam !== "teama" && normalizedTeam !== "teamb") {
      console.error(`Invalid team: ${team}`);
      return;
    }

    // Check if the team has enough purse to place the bid
    if (normalizedTeam === "teama" && updatedTeamA.purse < auctionState.currentBid + bidAmount) {
      alert("Team A does not have enough purse to bid!");
      return;
    }
    if (normalizedTeam === "teamb" && updatedTeamB.purse < auctionState.currentBid + bidAmount) {
      alert("Team B does not have enough purse to bid!");
      return;
    }

    // Update the auction state
    const updatedAuctionState = {
      ...auctionState,
      currentBid: auctionState.currentBid + bidAmount,
      currentBidder: normalizedTeam, // Set the currentBidder to the normalized team name
    };

    // Save updated auction state to json-server
    await fetch("http://localhost:3001/auctionState", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedAuctionState),
    });

    // Update state
    setAuctionState(updatedAuctionState);
  };

  const handleSurrender = async (team) => {
    let updatedTeamA = { ...teamA };
    let updatedTeamB = { ...teamB };

    // Determine the winning team (opposite of the surrendering team)
    const winningTeam = team === "teama" ? "teamb" : "teama";

    // Add the player to the winning team with the soldFor price
    const soldPlayer = { ...auctionState.currentPlayer, soldFor: auctionState.currentBid };

    // Deduct the bid amount from the winning team's purse
    if (winningTeam === "teama") {
      updatedTeamA.purse -= auctionState.currentBid;
      updatedTeamA.players.push(soldPlayer);
    } else {
      updatedTeamB.purse -= auctionState.currentBid;
      updatedTeamB.players.push(soldPlayer);
    }

    // Reset auction state
    const updatedAuctionState = {
      ...auctionState,
      currentPlayer: null,
      currentBid: 0,
      currentBidder: null,
    };

    // Save updated data to json-server
    await fetch("http://localhost:3001/teamA", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTeamA),
    });

    await fetch("http://localhost:3001/teamB", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTeamB),
    });

    await fetch("http://localhost:3001/auctionState", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedAuctionState),
    });

    // Update state
    setTeamA(updatedTeamA);
    setTeamB(updatedTeamB);
    setAuctionState(updatedAuctionState);
  };

  const handlePass = async () => {
    try {
      // Fetch the current auctionData
      const auctionDataResponse = await fetch("http://localhost:3001/auctionData");
      const auctionData = await auctionDataResponse.json();

      // Add the current player to the passedPlayers array
      const updatedPassedPlayers = [...auctionData.passedPlayers, auctionState.currentPlayer];

      // Update the auctionData object with the new passedPlayers array
      const updatedAuctionData = {
        ...auctionData,
        passedPlayers: updatedPassedPlayers,
      };

      // Save updated auctionData to json-server
      await fetch("http://localhost:3001/auctionData", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedAuctionData),
      });

      // Reset auction state
      const updatedAuctionState = {
        ...auctionState,
        currentPlayer: null,
        currentBid: 0,
        currentBidder: null,
      };

      // Save updated auction state to json-server
      await fetch("http://localhost:3001/auctionState", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedAuctionState),
      });

      // Update state
      setPassedPlayers(updatedPassedPlayers);
      setAuctionState(updatedAuctionState);
    } catch (error) {
      console.error("Error updating passedPlayers:", error);
    }
  };

  const handleSpin = async (player) => {
    const updatedAuctionState = {
      ...auctionState,
      currentPlayer: player,
      currentBid: player.basePrice, // Start bidding at the player's base price
      currentBidder: null,
      isAuctionLive: true,
    };

    // Save updated auction state to json-server
    await fetch("http://localhost:3001/auctionState", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedAuctionState),
    });

    // Update state
    setAuctionState(updatedAuctionState);
  };

  // Fetch data periodically for real-time updates
  useEffect(() => {
    const interval = setInterval(fetchData, 1000); // Fetch data every second
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <TopBar
        user={user}
        onLogout={handleLogout}
        getCaptainDisplayName={getCaptainDisplayName}
      /> {/* Add the TopBar component */}
      <Container>
        {!user ? (
          <Login onLogin={handleLogin} onGuestLogin={() => setUser({ id: "guest" })} />
        ) : (
          <>
            <Typography variant="h2" align="center" gutterBottom>
              Cricket Auction
            </Typography>
            <AuctionView
              teamA={teamA}
              teamB={teamB}
              currentPlayer={auctionState.currentPlayer}
              currentBid={auctionState.currentBid}
              currentBidder={auctionState.currentBidder}
              getTeamDisplayName={getTeamDisplayName}
            />
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TeamComponent
                  team={teamA}
                  teamName={getTeamDisplayName("teamA")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TeamComponent
                  team={teamB}
                  teamName={getTeamDisplayName("teamB")}
                />
              </Grid>
            </Grid>
            {user.id !== "guest" && (
              <SpinnerComponent
                players={allPlayers}
                onSpin={handleSpin}
                isSpinnerDisabled={auctionState.currentPlayer !== null}
                teamA={teamA}
                teamB={teamB}
                passedPlayers={passedPlayers}
              />
            )}
            {auctionState.currentPlayer && user.id !== "guest" && (
              <BiddingComponent
                currentPlayer={auctionState.currentPlayer}
                onBid={handleBid}
                onSurrender={handleSurrender}
                onPass={handlePass}
                currentBid={auctionState.currentBid}
                currentBidder={auctionState.currentBidder}
                user={user}
                getTeamDisplayName={getTeamDisplayName}
              />
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default App;