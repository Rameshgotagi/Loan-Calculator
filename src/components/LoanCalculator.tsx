import type React from "react";
import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme as useMuiTheme,
  Grid,
} from "@mui/material";
import { useEmiCalculator } from "../hooks/useEMICalculator";
import { useCurrency } from "../context/CurrencyContext";

/**
 * LoanCalculator Component
 *
 * A responsive React component that allows to:
 * - Input loan amount, interest rate, and loan term
 * - Calculate the monthly EMI (Equated Monthly Installment)
 * - Display an amortization schedule over the entire loan term
 * - Switch between different currencies using exchange rates from context
 */
const LoanCalculator: React.FC = () => {
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  const [loanAmount, setLoanAmount] = useState<string>("100000");
  const [interestRate, setInterestRate] = useState<string>("8.5");
  const [loanTerm, setLoanTerm] = useState<string>("10");
  const [resetTable, setResetTable] = useState(false);

  const { emi, amortizationSchedule, calculate } = useEmiCalculator();
  const { currency, setCurrency, convertAmount, availableCurrencies } =
    useCurrency();

  const handleCalculate = () => {
    calculate({
      principal: Number.parseFloat(loanAmount),
      interestRate: Number.parseFloat(interestRate),
      loanTerm: Number.parseFloat(loanTerm),
    });
    setResetTable(false);
  };

  const handleResetTable = () => {
    setResetTable(true);
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Box
      sx={{
        p: isMobile ? 2 : "16px 24px 24px 24px",
        width: isMobile ? "100%" : "85%",
        margin: "auto",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Loan Calculator Dashboard
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid>
          <TextField
            label="Loan Amount"
            type="number"
            fullWidth
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            InputProps={{ inputProps: { min: 0 } }}
          />
        </Grid>

        <Grid>
          <TextField
            label="Interest Rate (%)"
            type="number"
            fullWidth
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            InputProps={{ inputProps: { min: 0, step: 0.01 } }}
          />
        </Grid>
        <Grid>
          <TextField
            label="Term (Years)"
            type="number"
            fullWidth
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            InputProps={{ inputProps: { min: 1, max: 30 } }}
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={handleCalculate}
        sx={{ mb: 2 }}
      >
        CALCULATE
      </Button>

      {emi !== null && !resetTable && (
        <>
          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
            Monthly EMI: {formatCurrency(convertAmount(emi, "USD", currency))}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="currency-select-label">Currency</InputLabel>
              <Select
                labelId="currency-select-label"
                value={currency}
                label="Currency"
                onChange={(e) => setCurrency(e.target.value)}
              >
                {availableCurrencies.map((curr) => (
                  <MenuItem key={curr} value={curr}>
                    {curr}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              onClick={handleResetTable}
              sx={{
                color: "#9c27B0",
                border: "1px solid rgba(156, 39, 176, 0.5)",
              }}
            >
              RESET TABLE
            </Button>
          </Box>

          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Typography variant="h6" sx={{ p: "16px" }}>
                Amortization Schedule ({currency})
              </Typography>
              <Table stickyHeader aria-label="amortization schedule table">
                <TableHead>
                  <TableRow>
                    <TableCell>Month</TableCell>
                    <TableCell align="right">Principal</TableCell>
                    <TableCell align="right">Interest</TableCell>
                    <TableCell align="right">Remaining Balance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {amortizationSchedule.map((row) => (
                    <TableRow key={row.month} hover>
                      <TableCell>{row.month}</TableCell>
                      <TableCell align="right">
                        {formatCurrency(
                          convertAmount(row.principal, "USD", currency)
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(
                          convertAmount(row.interest, "USD", currency)
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(
                          convertAmount(row.remainingBalance, "USD", currency)
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default LoanCalculator;
