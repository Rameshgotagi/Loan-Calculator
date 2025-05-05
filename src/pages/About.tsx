import type React from "react";
import { Box, Typography, Paper } from "@mui/material";

const About: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        About This App
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="body1" paragraph>
          This Loan Calculator App is a modern, single-page web application
          built using React JS and Material UI. It allows users to calculate
          loan EMIs (Equated Monthly Installments), view a detailed amortization
          schedule, and see real-time currency conversions of their EMI using
          live exchange rates.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
          Features
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              Loan EMI calculation using standard financial formulas
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Dynamic amortization schedule table with monthly breakdown
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Real-time currency conversion of EMI using a live exchange rate
              API
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Paginated exchange rate table for 160+ currencies
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Dark/Light mode toggle for a customizable experience
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Collapsible header navigation on mobile screens
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Fully responsive UI built with Material UI
            </Typography>
          </li>
        </ul>

        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
          Technologies Used
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              React (Hooks, Routing, Context API)
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Material UI for styling and responsive components
            </Typography>
          </li>
          <li>
            <Typography variant="body1">Axios for API calls</Typography>
          </li>
          <li>
            <Typography variant="body1">
              Exchange Rate API for real-time currency conversion
            </Typography>
          </li>
          <li>
            <Typography variant="body1">TypeScript for type safety</Typography>
          </li>
        </ul>

        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
          EMI Formula Used
        </Typography>
        <Typography
          variant="body1"
          component="div"
          sx={{
            fontFamily: "monospace",
            my: 2,
            p: 2,
            bgcolor: "background.paper",
          }}
        >
          EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
        </Typography>
        <Typography variant="body1">Where:</Typography>
        <ul>
          <li>
            <Typography variant="body1">P = Principal loan amount</Typography>
          </li>
          <li>
            <Typography variant="body1">
              R = Monthly interest rate (annual rate / 12 / 100)
            </Typography>
          </li>
          <li>
            <Typography variant="body1">N = Loan duration in months</Typography>
          </li>
        </ul>

        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
          Currency Conversion API
        </Typography>
        <Typography variant="body1" paragraph>
          This app integrates with the free tier of the{" "}
          <a
            href="https://www.exchangerate-api.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ExchangeRate-API
          </a>{" "}
          to fetch live exchange rates.
        </Typography>
        <Typography variant="body1" paragraph>
          API Endpoint Example:
        </Typography>
        <Box
          sx={{
            fontFamily: "monospace",
            my: 2,
            p: 2,
            bgcolor: "background.paper",
          }}
        >
          https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD
        </Box>
        <Typography variant="body1" paragraph>
          You must register and obtain a free API key to use this endpoint.
          Then, replace YOUR_API_KEY in the app code with your actual key.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
          Purpose of This App
        </Typography>
        <Typography variant="body1" paragraph>
          This project is designed to assess a candidate's React development
          skills, including:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              React fundamentals (state, props, hooks)
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Component structure and code reusability
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Third-party API integration and live data rendering
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Working with tables, lists, and pagination
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Theme customization (dark/light mode toggle)
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Error handling and graceful UI fallbacks
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Responsive design and collapsible mobile header navigation (In
              Mobile view)
            </Typography>
          </li>
        </ul>
        <Typography variant="body1" paragraph sx={{ mt: 2 }}>
          ✨ For any currency conversion feature to work, make sure the API key
          is valid and the network allows external API calls.
        </Typography>
      </Paper>
    </Box>
  );
};

export default About;
