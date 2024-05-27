
import React from 'react'
import dayjs from "dayjs";
import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";
import { useLoaderData } from 'react-router-dom';
import  DateBox  from "./DateBox";
import { useAppointments } from "./Hooks/useAppointments.jsx";

import { appointmentsFetch } from '../../UTILS/axios';
  const url = '/';

const visitsQuery = (queryParams) => {
     
  return {
    queryKey: [
      'visits'          
    ],
    queryFn: () =>
    appointmentsFetch(url, {
        params: queryParams,
      }),
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);     
    const response = await queryClient.ensureQueryData(
      visitsQuery(params)
    );

    const data = response.data.data;    
    console.log(data)
    return { data};
    
  };

 const Visit = () =>{ 
  const {data: appointments}=useLoaderData();  
  console.log(appointments); 
  

  const isToday = (day) => {
    // Create a Dayjs object for the current date
    const today = dayjs();
    // Compare the day object with the current date by year, month, and day
    return today.isSame(day, 'date');
  };
 

  const dayStyle = (day) => {
    const currentDate = dayjs(`${monthYear.year}-${monthYear.month}-${day}`);    
    if (currentDate === 0) { // Check if it's Sunday
      return 'shadow-lg hover:shadow-md bg-red-500'; // Sunday style
    } else if (isToday(day)) { // Check if it's the current day
      return 'shadow-lg hover:shadow-md bg-accent'; // Current day style
    } else {
      return 'bg-gray-200'; // Default style
    }
  };
  
  const { 
    // appointments, 
    monthYear, updateMonthYear, showAll, setShowAll } =
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
      <div className='grid md:grid-cols-4 gap-5'>
        {[...Array(monthYear.lastDate)].map((_, i) => {
          const currentDate = dayjs(`${monthYear.year}-${monthYear.month}-${i + 1}`);
      
          const hasAppointment = (day, appointments) => { // Pass appointments as argument
            const currentDate = dayjs(`${monthYear.year}-${monthYear.month}-${day}`); // Create dayjs object in UTC
            const appointmentForDay = appointments.find(appointment => { // Find appointment for current date
              return dayjs.utc(appointment.date).isSame(currentDate, 'day'); // Check if dates match
            });
          
            return !!appointmentForDay; // Return true if appointment found, false otherwise
          };
          return (
            <DateBox
              key={i + 1}
              date={i + 1} // Raw date for styling purposes (optional)
              dayStyle={dayStyle(currentDate)} // Pass dayjs object for styling
              isToday={isToday(currentDate)}
              isSunday={isSunday(i + 1)}
              gridColumn={monthYear.firstDOW + 1}
              monthYear={monthYear}
              hasAppointment={hasAppointment} // Pass appointment information
              appointments={appointments[i+1]}
          
               appointment={appointments.find(appointment => dayjs(appointment.date).isSame(currentDate, 'day'))}
            >
              {/* ... content of the DateBox component */}
            </DateBox>
          );
        })}
      </div>

      {/* <UserAppointments /> */}
    </div>
  );
}
export default Visit ;

  