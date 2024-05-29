
import React from 'react'
import dayjs from "dayjs";
import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";
import { useLoaderData } from 'react-router-dom';
import  DateBox  from "./DateBox";
import { useAppointments } from "./Hooks/useAppointments.jsx";
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';

// import { appointmentsFetch } from '../../UTILS/axios';
import { visitsFetch } from '../../UTILS/axios'
  const url = '/';

const visitsQuery = (queryParams) => {
     
  return {
    queryKey: [
      'visits'          
    ],
    queryFn: () =>
    visitsFetch(url, {
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
  export const action =
  (queryClient) =>
  async ({ request }) => {    
    const formData = await request.formData();
    const {author,date,time} = Object.fromEntries(formData);    
    // const {date} = Object.fromEntries(formData);   
    try {
      const response = await visitsFetch.post(
        '/', {author,date,time}         
      )    
      console.log(response);   
      queryClient.removeQueries(['visits'])
      // queryClient.invalidateQueries({ queryKey: ['newsletter'] });   
      toast.success('we have your mail now'); 
    
      return redirect('/visits');
    }     
 catch (error) {
    console.log(error);
    const errorMessage =
      error?.response?.data?.msg 
      ||   'there was an error to send your email';
    toast.error(errorMessage);
    if (error?.response?.status === 401 || 403) return redirect('/');  
    return null;
  }
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
      
          const hasAppointment = (day) => {
            const currentDate = dayjs(`${monthYear.year}-${monthYear.month}-${day}`); // Create dayjs object in UTC
            const appointmentsForDay = appointments[currentDate.format('YYYY-MM-DD')]; // Access appointments by formatted date
            return appointmentsForDay && appointmentsForDay.length > 0; // Check if appointments exist for this date
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
              // appointments={appointments[i+1]}          
              //  appointment={appointments.find(appointment => dayjs(appointment.date).isSame(currentDate, 'day'))}
              // hasAppointment={hasAppointment(i + 1)} // Pass day or use appointments directly
              appointments={appointments} // Pass the entire appointments object      
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

  