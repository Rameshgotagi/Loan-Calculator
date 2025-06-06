import type React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { ThemeProvider } from "./context/ThemeContext";

import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import ExchangeRate from "./pages/ExchangeRate";
import About from "./pages/About";
import ErrorPage from "./error_pages/ErrorPage";
import { CurrencyProvider } from "./context/CurrencyContext";
import PageNotFound from "./error_pages/PageNotFound";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CurrencyProvider>
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
            <Box component="main" sx={{ flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/exchange-rates" element={<ExchangeRate />} />
                <Route path="/about" element={<About />} />
                <Route path="/error" element={<ErrorPage />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </CurrencyProvider>
    </ThemeProvider>
  );
};

export default App;
