   import { Link,useLoaderData } from 'react-router-dom';
  import { Form,useNavigate,redirect } from 'react-router-dom';
import { appointmentsFetch } from '../../UTILS/axios';
  const url = '/';
  import { useState, useEffect } from 'react';
import moment from 'moment';

const appointmentsQuery = (queryParams) => {
     
    return {
      queryKey: [
        'appointments'          
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
        appointmentsQuery(params)
      );
  
      const data = response.data.data;    
      console.log(data)
      return { data};
      
    };

const Appointment = () => { 
    const {data}=useLoaderData();  
    console.log(data); 

const [date, setDate] = useState(moment());
const [jobs, setJobs] = useState([]); // State to store fetched jobs


const { data: appointments } = useLoaderData( // Renamed to appointments
["appointments", moment().format('YYYY-MM-DD')], // Unique query key based on date
appointmentsFetch.bind(null, moment()), // Bind date to fetchJobs
{
  // Optional query options
  staleTime: 200, // Cache fetched data for 200ms
  keepPreviousData: true, // Keep previously fetched data while loading
  placeholderData: () => ({ jobs: [] }), // Provide placeholder data while loading
}
);
console.log(appointments); 

useEffect(() => {
  if (data) {
    setJobs(data); // Update jobs state when data is fetched
  }
}, [data]); // Dependency on fetchedJobs.jobs to trigger update

const prevMonth = () => {
  setDate(date.subtract(1, 'month'));
};

const nextMonth = () => {
  setDate(prevDate => prevDate.add(1, 'month'));
};

const handleNoteChange = (day, text) => {
  // Handle note changes if needed in the future
};

const renderDays = () => {
  const days = [];
  const firstDay = moment(date).startOf('month');
  const lastDay = moment(date).endOf('month');
  const dayCount = lastDay.diff(firstDay, 'days') + 1;

  for (let i = 0; i < dayCount; i++) {
    const currentDay = moment(firstDay).add(i, 'days');
    const jobForDay = appointments.length > 0 ? appointments.find(job => {
      // Match job date with current day (assuming a 'date' property in the job object)
      return moment(job.date).isSame(currentDay, 'day');
    }) : null; // Set jobForDay to null if appointments is empty

    const isToday = currentDay.isSame(moment(), 'day'); // Check if current day matches today

    days.push(
      <Day
        key={currentDay.format('YYYY-MM-DD')}
        day={currentDay}
        job={jobForDay}
        onNoteChange={handleNoteChange}
        isToday={isToday}
        appointments={appointments} // Pass appointments data here
      />
    );
  }

  return days;
};
return (
  <div className="mx-5">
    <div className="flex gap-5 justify-center mb-3">
      <button onClick={prevMonth}>Wstecz</button>
      <h1>{date.format('MMMM YYYY')}</h1>
      <button onClick={nextMonth}>Dalej</button>
    </div>
    <div className="grid md:grid-cols-4 gap-5">
      {renderDays()}
    </div>
  </div>
);
};

const Day = ({ day, job, onNoteChange, isToday,appointments }) => {
  const appointmentForDay = appointments?.find(appointment => 
    moment(appointment.date).isSame(day, 'day') // Match appointment date with current day
  );
const dayStyle = isToday ? 'shadow-lg hover:shadow-md bg-gray-200' : 'shadow-lg hover:shadow-md';
const {data}=useLoaderData(); 
console.log(data)
const navigate = useNavigate();


const handleLinkClick = () => {
  const selectedDate = day.format('YYYY-MM-DD');

  // Navigate to a path including the selected date
  navigate(`/appointments/${job._id}`, { replace: true });
};


return (
  <>
        <div className={dayStyle}>
        <div className="day-header">{day.format('dddd DD')}</div>
        {appointmentForDay ? (
          <div className="job-details">
            {/* Display job details here (e.g., title, description) */}
            <p className='text-blue-500'>{appointmentForDay.name}</p>
            {/* Add more details as needed based on your actual job object structure */}
          </div>
        ) : (
          <div className='text-red-500'>Brak zadań na ten dzień</div>
        )}
         {/* {isToday || appointmentForDay ? ( // Conditionally render the button */}
          <button
            className='p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap bg-base-100 shadow-xl hover:shadow-2xl duration-300 group'
            // disabled={!isToday && !appointmentForDay} // Disable if no appointment and not current day
            onClick={handleLinkClick}
          >
            details
          </button>
    
      </div> 

    </>
  );
};

export default Appointment;