import type React from "react";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import axios from "axios";

interface ExchangeRates {
  [key: string]: number;
}

interface CurrencyContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  exchangeRates: ExchangeRates;
  isLoading: boolean;
  error: string | null;
  convertAmount: (
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ) => number;
  availableCurrencies: string[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};

interface CurrencyProviderProps {
  children: ReactNode;
}
/**
 * CurrencyProvider and useCurrency Hook
 *
 * This context provides global access to:
 * - Selected currency (`currency`)
 * - Method to update currency (`setCurrency`)
 * - Fetched exchange rates (`exchangeRates`)
 * - Currency conversion function (`convertAmount`)
 * - List of all available currencies (`availableCurrencies`)
 * - Loading state (`isLoading`) and error messages (`error`)
 *
 * On mount, the provider fetches current exchange rates from exchangerate-api
 * and makes them available throughout the app via context.
 */
export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({
  children,
}) => {
  const [currency, setCurrency] = useState<string>("USD");
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [availableCurrencies, setAvailableCurrencies] = useState<string[]>([]);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${"ca67c6dbb84e0b4878a581c9"}/latest/USD`
        );

        if (response.data.result === "success") {
          setExchangeRates(response.data.conversion_rates);
          setAvailableCurrencies(Object.keys(response.data.conversion_rates));
        } else {
          setError("Failed to fetch exchange rates");
        }
      } catch (err) {
        setError("Error fetching exchange rates");
        console.error("Error fetching exchange rates:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  const convertAmount = (
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ): number => {
    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
      return amount;
    }

    // Convert from source currency to USD (base currency)
    const amountInUSD = amount / exchangeRates[fromCurrency];

    // Convert from USD to target currency
    return amountInUSD * exchangeRates[toCurrency];
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        exchangeRates,
        isLoading,
        error,
        convertAmount,
        availableCurrencies,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
