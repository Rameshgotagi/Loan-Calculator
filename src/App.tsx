import type React from "react";

import { Box } from "@mui/material";
import { ThemeProvider } from "./context/ThemeContext";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Box>Theme Provider</Box>
    </ThemeProvider>
  );
};

export default App;
