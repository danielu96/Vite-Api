import React from 'react';
import { Form,Link, useLoaderData,useNavigation, redirect } from 'react-router-dom';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { appointmentsFetch,customFetch } from '../../UTILS/axios';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { toast } from 'react-toastify';
import FormInput from '../../components/FormInput.jsx';

dayjs.extend(advancedFormat);

// export const userQuery = (user, monthYear) => {
//   console.log(user, monthYear);

//   // Define monthYear conditionally
//   const definedMonthYear = user ? monthYear : {}; // Create an empty object if user is undefined

//   // Use optional chaining for safer property access
//   return {
//     queryKey: [
//       'singleAppointmentUser',
//       user?.name,
//       definedMonthYear?.year,
//       definedMonthYear?.month,
//       definedMonthYear?.day,
//     ],
//     queryFn: () =>
//       // Safe access using optional chaining
//       customFetch.get(
//         `/appointments/${definedMonthYear?.year}/${definedMonthYear?.month}/${definedMonthYear?.day}`,
//         {
//           headers: {
//             Authorization: `Bearer ${user?.token}`,
//           },
//         }
//       ),
//   };
// };


export const userQuery = (user) => {
  console.log(user)
 
  if(user) {
    // const { monthYear } = new MonthYear();
  return {
    queryKey: [
      'singleAppointmentUser',
      user?.name, 
      // monthYear?.year,
      // monthYear?.month,
      // monthYear?.day        
    ],
    queryFn: () =>
      customFetch.get('/appointments',
        // ${monthYear.year}/${monthYear.month}/${monthYear.day}
        
        {               
        headers: {          
          Authorization: `Bearer ${user.token}`,          
        },        
      }),  
    }  
  };  
};


export const loader = (store, queryClient) => async ({ request }) => {
  const user = store.getState().userState.user;
   if (!user) {
      toast.warn('You must be logged in to view appointment');
      return redirect('/login');
    }
    // const params = Object.fromEntries([
    //   ...new URL(request.url).searchParams.entries(),
    // ]);
  const response = await queryClient.ensureQueryData(
    userQuery(user)
    
  );
  //  const userResponse = await queryClient.ensureQueryData(singleAppointmentQuery);
  // const appointment = userResponse.data.filteredAppointments;
  const data = response.data.data;
 
 console.log(data)
  return {
      data
    };
};


export const action = 
( store, queryClient, monthYear) =>
async ({ request }) => {
  const user = store.getState().userState.user;
  // const formData = await request.formData();
  // const {name} = Object.fromEntries(formData);  
  try {   
    const response = await customFetch.post(
      '/appointments', `${monthYear.year}/${monthYear.month}/${monthYear.day}/${user.name }`        
    ) 
    queryClient.removeQueries(['singleAppointment']); 
    toast.success(response?.data?.msg);
    return redirect('/appointment');  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const AppointmentDetail = (date) => {

  const { data } = useLoaderData();  
  // const dispatch = useDispatch()  
  const user = useSelector((state) => state.userState.user);
  console.log(user.name,data, date)
  // const navigation = useNavigation();
  const [selectedSlot, setSelectedSlot] = useState(null); // State to store selected slot
  // const isSubmitting = navigation.state === 'submitting';  
  // Function to create time slots (9:00 to 18:00)
  const createTimeSlots = () => {
    const times = [];
    for (let hour = 9; hour <= 18; hour++) {
      times.push({
        hour: hour.toString().padStart(2, '0'), // Pad hour with leading zero
        minute: '00', // Assume appointments are on the hour
        isBooked: false,
        name: 'user.name', // Add an empty author property for booked slots
      });
    }
    return times;
  };
   
    const timeSlots = React.useMemo(() => {
    const slots = createTimeSlots();
    if (data?.length) { // Check if appointment is an array and has elements
      data.forEach((appt) => {
        const bookedIndex = slots.findIndex((slot) => slot.hour === appt.time.split(':')[0]);
        if (bookedIndex !== -1) {
          slots[bookedIndex].isBooked = true;
          slots[bookedIndex].name = appt.name;
        }
      });
    }
    return slots;
  }, []);

  const handleSlotClick = (slot) => {
    if (slot.isBooked) {
      toast.warn('This hour is already booked.');
      return; // Prevent further actions if slot is booked
    }
    setSelectedSlot(slot); // Update selected slot state
  };
  const handleAddToCart = async () => {
    
    if (!selectedSlot) {
      toast.warn('Please select a time slot first.');
      return;
    }
    const { hour, minute } = selectedSlot;
    const selectedTime = `${hour}:${minute}`;
    try {
       // Set navigation state to "submitting"
      const response = await customFetch.post(`/appointments/${monthYear.year}/${monthYear.month}/${monthYear.day}`,
         {
        name: user.name,
        time: selectedTime,
      });

      if (response.data?.success) {
        toast.success('Appointment added!');
        setSelectedSlot(null); // Clear selected slot
      } else {
        toast.error(response.data?.msg || 'An error occurred.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    } finally {
      redirect('/appointment'); // Reset navigation state to "idle"
    }
  };

  
  return (
    <>
    
      <section className="grid place-items-center">
        <h2 className="text-lg font-medium mb-4">Appointments for: </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {timeSlots.map((slot) => (
            <div 
           
              key={slot.hour}
              className={`p-3 rounded-lg flex flex-row gap-y-4 flex-wrap bg-base-100 shadow-md hover:shadow-sm duration-300 ${
                slot.isBooked ? 'bg-gray-200 text-gray-700' : ''
              }`}
              // onClick={() => handleAddToCart(slot)}
              onClick={() => handleSlotClick(slot)} // Call handleSlotClick on click
            >
              <h3 className="ml-0 capitalize font-medium text-lg">
                {slot.hour}:00
              </h3>
              {slot.isBooked && <span className="ml-2 text-md text-gray-700">{slot.name}</span>}
              <Form method='POST' className='flex flex-col gap-y-4 '>
       
      <div>
      <FormInput type='text' name='name' />
      </div> 
             
    </Form>           
   
              <button className="mt-4 btn btn-primary" onClick={handleAddToCart}>
        Add to Cart
      </button>
            </div>            
          ))}      
        </div>      
        <Link className="mt-4" to="/appointments">
          Back
        </Link>
        <div className='text-center'>
      <h2>Your Cart {user?.name}</h2>
      {data.length === 0 && <p>is empty</p>}
      {data.length > 0 && (
        <ul className='gap-x-3'>
          {data.map((appointment) => ( 
            <li  key={appointment.id}>
              {appointment.date}:  
              {appointment.time}: 
               {appointment.name}           
            </li>
          ))}
        </ul>
      )}  
    </div>
      </section>       
    </>
  );
};
export default AppointmentDetail;

