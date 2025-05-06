import type React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useCurrency } from "../context/CurrencyContext";
/**
 * ExchangeRate component displays real-time currency exchange rates
 */
const ExchangeRate: React.FC = () => {
  const { exchangeRates, isLoading, error } = useCurrency();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredRates, setFilteredRates] = useState<[string, number][]>([]);

  useEffect(() => {
    if (exchangeRates) {
      const ratesArray = Object.entries(exchangeRates);
      setFilteredRates(ratesArray);
    }
  }, [exchangeRates]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 4, mx: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" component="h1" sx={{ mt: 4 }} gutterBottom>
        Live Exchange Rates (Base: USD)
      </Typography>

      <Paper sx={{ width: "100%", overflow: "hidden", mt: 2 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="exchange rates table">
            <TableHead>
              <TableRow>
                <TableCell>Currency</TableCell>
                <TableCell align="right">Rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRates
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(([currency, rate]) => (
                  <TableRow key={currency} hover>
                    <TableCell>{currency}</TableCell>
                    <TableCell align="right">{rate.toFixed(6)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={filteredRates.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default ExchangeRate;
