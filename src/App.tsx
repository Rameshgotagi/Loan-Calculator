import type React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Box } from "@mui/material";
import { ThemeProvider } from "./context/ThemeContext";

import Navigation from "./components/Navigation";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            width: "100%",
          }}
        >
          <Navigation />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
