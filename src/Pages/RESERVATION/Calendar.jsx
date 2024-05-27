

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useQuery, useQueryClient } from "@tanstack/react-query";

async function fetchJobs() {
  const response = await fetch('http://localhost:5000/api/jobs/');
  return response.json();
}

const Calendar = () => {
  const [date, setDate] = useState(moment());
  const [jobs, setJobs] = useState([]); // State to store fetched jobs
  const queryClient = useQueryClient();
  

  const { isLoading, error, data: fetchedJobs } = useQuery(
    ["jobs", date.format('YYYY-MM-DD')], // Unique query key based on date
    fetchJobs.bind(null, date), // Bind date to fetchJobs
    console.log(jobs.jobs),
    {
      // Optional query options
      staleTime: 200, // Cache fetched data for 200ms
      keepPreviousData: true, // Keep previously fetched data while loading
      placeholderData: () => ({ jobs: [] }), // Provide placeholder data while loading
      
    }
    
  );
  useEffect(() => {
    if (fetchedJobs) {
      setJobs(fetchedJobs.jobs); // Update jobs state when data is fetched
    }
  }, [fetchedJobs]); // Dependency on fetchedJobs.jobs to trigger update

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
      const jobForDay = jobs.length > 0 ? jobs.find(job => {
        // Match job date with current day (assuming a 'date' property in the job object)
        return moment(job.date).isSame(currentDay, 'day');
      }) : null; // Set jobForDay to null if jobs is empty

      const isToday = currentDay.isSame(moment(), 'day'); // Check if current day matches today

      days.push(
        <Day
          key={currentDay.format('YYYY-MM-DD')}
          day={currentDay}
          job={jobForDay} // Pass the job object to Day component
          onNoteChange={handleNoteChange} // Optional: Pass handleNoteChange if needed
          isToday={isToday}
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

const Day = ({ day, job, onNoteChange, isToday }) => {
  const dayStyle = isToday ? 'shadow-lg hover:shadow-md bg-gray-200' : 'shadow-lg hover:shadow-md';

  return (
    <>
      <div className={dayStyle}>
        <div className="day-header">{day.format('dddd DD')}</div>
        {job ? (
          <div className="job-details">
            {/* Display job details here (e.g., title, description) */}
            <p className='text-blue-500'>{job.name}</p>
            {/* Add more details as needed based on your actual job object structure */}
          </div>
        ) : (
          <textarea className='text-blue-500'
          placeholder='no jobs'
          ></textarea>
          // <div className='text-red-500'>No jobs</div>
        )}
      </div>
    </>
  );
};

export default Calendar;