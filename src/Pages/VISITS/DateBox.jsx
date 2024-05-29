import React from 'react';
import dayjs from 'dayjs';
import { useLoaderData } from 'react-router-dom';
import { redirect,Form } from 'react-router-dom';
import  {FormInput,SubmitBtn} from '../../Components';
import { useState } from 'react';
// const [selectedTime, setSelectedTime] = useState('');

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

  // const createCustomStep = (minStep) => {
  //   const steps = [];
  //   for (let hour = 10; hour <= 18; hour++) {
  //     for (let minute = 0; minute < 60; minute += minStep) {
  //       const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  //       steps.push(formattedTime);
  //     }
  //   }
  //   return steps;
  // };
  const validateTime = (time) => {
    const selectedTime = dayjs(time, 'HH:mm'); // Parse the time string
    const isValidHour = selectedTime.hour() >= 10 && selectedTime.hour() <= 18; // Check if hour is between 10 and 18
    if (!isValidHour) {
      return 'Please select a time between 10:00 and 18:00.'; // Return error message
    }
    return true; // Time is valid
  };


  
  const authors = data.map(appointment => appointment.author); 
  const appointments = data;
  console.log(appointments);
  console.log(authors); // Array containing all names
  const filteredAppointments = appointments.filter(
    (appointment) => dayjs(`${monthYear.year}-${monthYear.month}-${date}`).isSame(dayjs(appointment.date), 'date')
  );
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
         <div className="text-center pt-4 pb-4 grid overflow-y-scroll ">
        {date}
        {isTodayOfDate && <span>we have : {dayjs().format('DD.MM.YYYY')}</span>}    
          {hasAppointment && filteredAppointments.length > 0 && (
  <>
    <span className="text-green-500 font-bold">Appointments:</span>
    <ul className="list-disc pl-4 mt-2">
      {filteredAppointments.map((appointment) => (
        <li key={appointment.id}>
          {appointment.author} - {appointment.time}
        </li>
      ))}
    </ul>
  </>
)}       
      </div>    
            {isSunday ? null : <Form  method='POST'className='flex flex-col gap-y-4'>     
       <div className='mt-4'>

        
       <FormInput type='text' name='author'   />      
       <FormInput type='date' name='date'   />    
       <FormInput type='time' name='time' step="30"   />    
       
        {/* <FormInput type='time' name='time' step="1800"   /> */}
        {/* <FormInput
  type='time'
  name='time'
  step='30'
  onChange={(e) => {
    const error = validateTime(e.target.value); // Validate time on change
    if (error) {
      // Set error state or display error message
    } else {
      // Time is valid, update state or perform other actions
    }
  }}
/> */}
{/* <FormInput type="time" id="myTime" min="10:00:00" max="18:00:00" step="60"/> */}

      </div>      
    </Form>  }
      </div>
 <div className="text-center pt-4 pb-4 grid">          
            </div>
    </div>
  );
};
export default DateBox;