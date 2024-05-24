
import React from 'react'
import dayjs from "dayjs";
import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";

import  DateBox  from "./DateBox";
import { useAppointments } from "./Hooks/useAppointments.jsx";

 const Visit = () =>{  


  const isToday = (day) => {
    // Create a Dayjs object for the current date
    const today = dayjs();
    // Compare the day object with the current date by year, month, and day
    return today.isSame(day, 'date');
  };
  const dayStyle = (day) => {
    const dayOfWeek = day.getDay(); // Get the day of the week (0-6)
    if (dayOfWeek === 0) { // Check if it's Sunday
      return 'shadow-lg hover:shadow-md bg-red-500'; // Sunday style
    } else if (isToday(day)) { // Check if it's the current day
      return 'shadow-lg hover:shadow-md bg-accent'; // Current day style
    } else {
      return 'bg-gray-200'; // Default style
    }
  };
 
  
  const { appointments, monthYear, updateMonthYear, showAll, setShowAll } =
    useAppointments();

    const isSunday = (date) => {
      const day = dayjs(`${monthYear.year}-${monthYear.month}-${date}`);
      return day.day() === 0; // Check if day of week is 0 (Sunday)
    };



  return (
    <div className=" gap-5 justify-center mb-3">
      <div className="calendar-day justify-center">
 {isToday ? <span>Dzisiaj mamy: {dayjs().format('DD.MM.YYYY')}</span> : <span>fuck we have nothing</span>}
</div>
      <div className='flex gap-5 justify-center mb-5'>
        <button   className="btn btn-sm"         
          onClick={() => updateMonthYear(-1)}        
                          >prev</button>
        <h1>
          {monthYear.monthName} {monthYear.year} 
        </h1>
        <button
        className="btn btn-sm"
                   onClick={() => updateMonthYear(1)}
         
        >next</button>      
      </div>
      <div             
        className='grid md:grid-cols-4 gap-5'
        >          
         
{/* {[...Array(monthYear.lastDate)].map((_, i) => (
  <DateBox
    key={i + 1}
    date={i+1}
    dayStyle={dayStyle}
    isToday={isToday(i + 1)} // Compare passed date with current date   
    isSunday={isSunday}
    grid-column={monthYear.firstDOW + 1}
         >   
  </DateBox>
))} */}

{[...Array(monthYear.lastDate)].map((_, i) => (
  <DateBox
    key={i + 1}
    date={i + 1} // Raw date for styling purposes (optional)
    dayStyle={dayStyle}
    isToday={isToday(dayjs(`${monthYear.year}-${monthYear.month}-${i + 1}`))} // Create Dayjs object for comparison
    isSunday={isSunday(i + 1)}
    gridColumn={monthYear.firstDOW + 1}
    monthYear={monthYear} 
  >
  {/* ... */}
  </DateBox>
))}





      </div>
      {/* <UserAppointments /> */}
    </div>
  );
}
export default Visit ;

  