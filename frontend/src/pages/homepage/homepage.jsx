import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import {useAuth0} from '@auth0/auth0-react'




const LandingPage = () => { 
  const {loginWithRedirect, isAuthenticated} = useAuth0();
  const navigator = useNavigate();

  function handleClick(){
    if(isAuthenticated){
      navigator('/dashboard');
    }
    else{
      loginWithRedirect();
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        textAlign: "center",
        padding: 4,
      }}
    >
      <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold" }}>
        Welcome to My Calendar App
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: 4 }}>
        Organize your schedule, track your events, and stay productive. Get started today!
      </Typography>
      <Button
        onClick={handleClick}
        variant="contained"
        size="large"
      >
        {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
      </Button>
    </Box>
  );
};

export default LandingPage;
