import React from 'react';
import { Link , useLoaderData } from 'react-router-dom';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { appointmentsFetch } from '../../UTILS/axios';

dayjs.extend(advancedFormat);


const singleAppointmentQuery = (monthYear) => { 
    // Include monthYear as a parameter
    return {
        queryKey: ['singleAppointment', monthYear.year, monthYear.month, monthYear.day],
        queryFn: () => appointmentsFetch(`${monthYear.year}/${monthYear.month}/${monthYear.day}`),
    };
};
export const loader = (queryClient) => async ({ params }) => {
  const response = await queryClient.ensureQueryData(
    singleAppointmentQuery(params)
  );

  return { appointment: response.data};
};

const AppointmentDetail = () => { // Destructure monthYear from props
    const { appointment } = useLoaderData();
console.log(appointment)

    return (
        <>
            <section className='grid place-items-center'>
            Halloo
                <div className='mt-12 flex gap-1'>
                    
                    {appointment.map((appointment) => {            
               return (
          <div
            key={appointment.id}
            // to={`/users/${user._id}`}
            className='p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap bg-base-100 shadow-xl hover:shadow-2xl duration-300 group'
          >
            {/* <img
              src={product.image}
              alt={product.title}
              className='h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover group-hover:scale-105 transition duration-300'
            /> */}
            <div className='ml-0 sm:ml-16'>
              <h3 className='capitalize font-medium text-lg'>{appointment.author}</h3>
              <h4 className='capitalize text-md text-neutral-content'>
                {appointment.time}
              </h4>             
            </div>
            
          </div>
        );
      })} 
                </div>
                <Link to={'/appointments'}>back</Link>
            </section>
        </>
    );
};

export default AppointmentDetail;