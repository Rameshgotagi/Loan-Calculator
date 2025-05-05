import { useState, useCallback } from "react";

interface LoanDetails {
  principal: number;
  interestRate: number;
  loanTerm: number;
}

interface AmortizationRow {
  month: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}
/**
 * Custom React hook for calculating EMI (Equated Monthly Installment)
 * and generating a detailed amortization schedule.
 *
 * @returns {
*   emi: number | null - The calculated EMI based on loan details.
*   amortizationSchedule: AmortizationRow[] - Monthly breakdown of principal, interest, and remaining balance.
*   calculate: (loanDetails: LoanDetails) => {
*     emi: number;
*     amortizationSchedule: AmortizationRow[];
*   } - Function to trigger the EMI and schedule calculation.

*/

export const useEmiCalculator = () => {
  const [emi, setEmi] = useState<number | null>(null);
  const [amortizationSchedule, setAmortizationSchedule] = useState<
    AmortizationRow[]
  >([]);

  const calculateEmi = useCallback(
    ({ principal, interestRate, loanTerm }: LoanDetails): number => {
      // Convert annual interest rate to monthly and decimal form
      const monthlyInterestRate = interestRate / 12 / 100;

      // Convert loan term from years to months
      const loanTermInMonths = loanTerm * 12;

      // EMI formula: P × r × (1 + r)^n / ((1 + r)^n - 1)
      const emi =
        (principal *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, loanTermInMonths)) /
        (Math.pow(1 + monthlyInterestRate, loanTermInMonths) - 1);

      return emi;
    },
    []
  );

  const generateAmortizationSchedule = useCallback(
    ({ principal, interestRate, loanTerm }: LoanDetails): AmortizationRow[] => {
      const monthlyInterestRate = interestRate / 12 / 100;
      const loanTermInMonths = loanTerm * 12;
      const monthlyEmi = calculateEmi({ principal, interestRate, loanTerm });

      let remainingBalance = principal;
      const schedule: AmortizationRow[] = [];

      for (let month = 1; month <= loanTermInMonths; month++) {
        const interestForMonth = remainingBalance * monthlyInterestRate;
        const principalForMonth = monthlyEmi - interestForMonth;
        remainingBalance -= principalForMonth;

        schedule.push({
          month,
          principal: principalForMonth,
          interest: interestForMonth,
          remainingBalance: Math.max(0, remainingBalance), // Ensure we don't go below zero
        });
      }

      return schedule;
    },
    [calculateEmi]
  );

  const calculate = useCallback(
    (loanDetails: LoanDetails) => {
      const calculatedEmi = calculateEmi(loanDetails);
      setEmi(calculatedEmi);

      const schedule = generateAmortizationSchedule(loanDetails);
      setAmortizationSchedule(schedule);

      return { emi: calculatedEmi, amortizationSchedule: schedule };
    },
    [calculateEmi, generateAmortizationSchedule]
  );

  return {
    emi,
    amortizationSchedule,
    calculate,
  };
};
