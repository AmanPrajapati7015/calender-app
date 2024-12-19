import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); 
  };

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
        404 - Page Not Found
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: 4 }}>
        Oops! The page you're looking for doesn't exist. Let's get you back on track.
      </Typography>
      <Button
        onClick={handleGoHome}
        variant="contained"
        size="large"
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default ErrorPage;
