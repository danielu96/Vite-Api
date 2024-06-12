import React from 'react'
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

const isToday = (day) => {
  // Create a Dayjs object for the current date
  const today = dayjs();
  // Compare the day object with the current date by year, month, and day
  return today.isSame(day, 'date');
};

const DayBox = ({ date,isSunday,monthYear,isFirstDayOfMonth,calculatedDivColumn,dayName }) => {
  const isTodayOfDate = isToday(dayjs(`${monthYear.year}-${monthYear.month}-${date}`)); // Use full date object
   
  console.log(isFirstDayOfMonth)
    return (
      <div 
      className={
        isTodayOfDate
          ? 'shadow-lg hover:shadow-md bg-accent' // Current day style
          : 
          isSunday ? 'shadow-lg hover:shadow-md bg-red-500' // Sunday style
          :  
           isFirstDayOfMonth ? `col-start-${calculatedDivColumn} bg-blue-400 shadow-lg hover:shadow-sm hover:bg-white` // Default
           :  'bg-gray-200 shadow-lg hover:shadow-sm hover:bg-white'
      }
      ><span>{date}</span> <p>{dayName} </p>
      <Link date={date} monthYear={monthYear} to={`/appointments/${monthYear.year}/${monthYear.month}/${date}`}>details</Link>
      </div> // Use divColumn for grid-column-start
    );
  };

export default DayBox

