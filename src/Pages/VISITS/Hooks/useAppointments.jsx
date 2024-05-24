import dayjs from "dayjs";
import { useState } from "react";
import { getMonthYearDetails, getNewMonthYear } from "./monthYear";


export function useAppointments() {
  const currentMonthYear = getMonthYearDetails(dayjs());
  const [monthYear, setMonthYear] = useState(currentMonthYear);

  // No need for separate state object

  function updateMonthYear(monthIncrement) {
    const updatedMonthYear = getNewMonthYear(monthYear, monthIncrement);
    // Update state using setMonthYear
    setMonthYear(updatedMonthYear);
  }

  return {
    monthYear, // directly return monthYear from state
    updateMonthYear,
  };
}