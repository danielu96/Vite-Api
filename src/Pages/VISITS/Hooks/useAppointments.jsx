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


  // State object to hold data
  // const state = {
  //   monthYear: currentMonthYear,
  //   appointments: {}, // AppointmentDateMap
  //   showAll: false,
  // };

//   function updateMonthYear(monthIncrement: number) {
//     state.monthYear = getNewMonthYear(state.monthYear, monthIncrement);
//   }
//   function updateMonthYear(monthIncrement: number) {
//     const updatedMonthYear = getNewMonthYear(state.monthYear, monthIncrement);
//     state.monthYear = updatedMonthYear;
//   }


  function fetchAppointments() {
    const { year, month } = state.monthYear;
    getAppointments(year, month)
      .then((data) => {
        state.appointments = data;
      })
      .catch((error) => {
        // Handle errors appropriately
        console.error("Error fetching appointments:", error);
      });
  }

  // function filterAppointments() {
  //   if (state.showAll) {
  //     // Return all appointments
  //     return state.appointments;
  //   } else {
  //     // Implement filtering logic (might need to adjust getAvailableAppointments)
  //     const availableAppointments = getAvailableAppointments(state.appointments, userId);
  //     return availableAppointments;
  //   }
  // }

  // const filteredAppointments = filterAppointments();
