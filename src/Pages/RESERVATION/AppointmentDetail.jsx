import { Date } from 'react';
import { FormInput, SubmitBtn } from '../../Components';
import { Form, Link, useNavigate, useLoaderData } from 'react-router-dom';
import { appointmentsFetch } from '../../UTILS/axios';
import { toast } from 'react-toastify';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);
// const selectedDate = day.format('YYYY-MM-DD');

// const singleAppointmentQuery = (id) => {
//   return {
//     queryKey: ['singleAppointment', id],
//     queryFn: () => appointmentsFetch(`/${id}`),
//   };
// };
const singleAppointmentQuery = (id) => {
  return {
    queryKey: ['singleAppointment', id],
    queryFn: () => appointmentsFetch(`/${id}`), // Replace `/id` with `/date`
  };
};
// const formattedDate = new Date(selectedDate).toISOString().slice(0, 10); // YYYY-MM-DD
// const singleAppointmentQuery = (id) => ({
//   queryKey: ['singleAppointment', id],
//   queryFn: () => appointmentsFetch(`/${formattedDate}`),
// });
// const singleAppointmentQuery = (selectedDate) => {
//   return {
//     queryKey: ['appointmentsByDate', selectedDate],
//     queryFn: () =>
//       appointmentsFetch(
//         `/api/appointments?startDate=<span class="math-inline">\{selectedDate\}&endDate\=</span>{selectedDate}`
//       ),
//   };
// };


export const loader = (queryClient) => async ({ params }) => {
  const response = await queryClient.ensureQueryData(
    singleAppointmentQuery(params.id)
  );

  return { appointment: response.data.appointment };
};

const AppointmentDetail = () => {
  const { appointment } = useLoaderData();
  // const navigate = useNavigate();

  // if (!appointment) {
  //   // No appointment found, redirect to a specific "no appointment" page
  //   navigate(`/appointments/${selectedDate}`);
  //   return null; // Prevent rendering the component if no appointment found
  // }

  console.log(appointment);
  // const formattedDate = appointment.date.toLocaleDateString('pl-PL', {
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric'
  // });
//   const formattedDate = appointment.date && new Date(appointment.date).toLocaleDateString('pl-PL', {
//   year: 'numeric',
//   month: 'long',
//   day: 'numeric'
// });
// const formattedDate = Date('2024-05-16'); // This will cause the error
// const formattedDate = new Date('2024-05-16');
  //  const appointmentDate = new Date(appointment.date);
  //       const formattedDate = appointmentDate.toLocaleDateString('pl-PL');
  const date = day(appointment.date).format('hh:mm a - MMM Do, YYYY ');
  return (
    <>
      <section className=' grid place-items-center'>
        <div className='mt-12 flex gap-1'>
         {date}
         {/* <p className='float-left'>  {appointment.name}</p> */}
          {/* {formattedDate} */}
           {/* Formatowanie daty */}
        {/* {`Data: ${formattedDate}`} */}
        {/* {formattedDate} */}
        {/* Koniec formatowania daty */}
        
        </div>
        <div className='mt-2 flex gap-1 font-bold'>
          {appointment.name}
        </div>
      </section>
    </>
  );
};

export default AppointmentDetail;