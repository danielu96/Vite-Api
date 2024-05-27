import React from 'react';
import dayjs from 'dayjs';
import { useLoaderData } from 'react-router-dom';

const isToday = (day) => {
  // Create a Dayjs object for the current date
  const today = dayjs();
  // Compare the day object with the current date by year, month, and day
  return today.isSame(day, 'date');
};

const DateBox = ({ date, isSunday,monthYear,hasAppointment,appointment }) => {
  const isTodayOfDate = isToday(dayjs(`${monthYear.year}-${monthYear.month}-${date}`)); // Use full date object
 
  const {data}=useLoaderData();  
  console.log(data); 

  const names = data.map(appointment => appointment.name);
  console.log(names); // Array containing all names
  return (
    <div
      className={
        isTodayOfDate
          ? 'shadow-lg hover:shadow-md bg-accent' // Current day style
          : isSunday ? 'shadow-lg hover:shadow-md bg-red-500' // Sunday style
            : 'bg-gray-100 shadow-lg hover:shadow-sm hover:bg-white' // Default
      }
    >
      <div className="text-center pt-4 pb-4 grid">      
         <div className="text-center pt-4 pb-4 grid">
        {date}
        {isTodayOfDate && <span>we have : {dayjs().format('DD.MM.YYYY')}</span>}
        {hasAppointment && appointment && ( // Check both conditions
          <>
            <span className="text-green-500 font-bold">Appointment:</span>
            <span className="text-gray-600 font-bold">{appointment.name}</span>
          </>
        )}
      </div>
      </div>
 <div className="text-center pt-4 pb-4 grid">          
            </div>
    </div>
  );
};
export default DateBox;