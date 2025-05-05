import type React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "calc(100vh - 64px)",
        p: 3,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Something went wrong in the application.
      </Typography>

      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate("/")}
        sx={{ mt: 2 }}
      >
        Go Home
      </Button>
    </Box>
  );
};

export default ErrorPage;
