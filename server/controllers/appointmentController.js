import {StatusCodes} from 'http-status-codes';
import Appointment from '../models/appointmentModel.js'
import dayjs from "dayjs";


// export const createAppointment= async (req,res)=> {    
//   req.body.createdBy = req.user.userId;     
//   // const { author } = req.body;
//   const { date } = req.body;
//   const { time } = req.body;
//     if ( !date || !time) {
//       res.status(400).json({ msg: 'please provide value' });
//       return;
//     } 
//   const appointment = await Appointment.create(req.body)  
//      //   next();    
//   res.status(StatusCodes.CREATED).json({appointment, msg:'appointment save !!!'});
// };
// export const createAppointment = async (req, res) => {
//   // Check if user is authenticated (replace with your actual logic)
//   if (!req.user) {
//     return res.status(401).json({ msg: 'Unauthorized' });
//   }
//   // Access user ID from the authenticated user information
//   const userId = req.user.userId; // Assuming this is where you get the user ID
//   req.body.createdBy = userId; // Set createdBy property
//   const { date, time } = req.body;
//   if (!date || !time) {
//     res.status(400).json({ msg: 'Please provide date and time' });
//     return;  }
//   const appointment = await Appointment.create(req.body);
//   res.status(StatusCodes.CREATED).json({ appointment, msg: 'Appointment saved!' });
// };

export const createAppointment= async (req,res)=> {  
  req.body.createdBy = req.user.userId;      
  const appointment = await Appointment.create(req.body)  
     //   next();    
  res.status(StatusCodes.CREATED).json({appointment, msg:'save !!!'});
};


export const getAllAppointments= async (req,res)=>{       
  let queryObject= {  
    createdBy : req.user.userId      
        } ;
  
  let result = Appointment.find(queryObject)
  result=result.sort('-createdAt');
  const AllAppointments = await Appointment.countDocuments(queryObject) ;
  let data = await result   
    res.status(200).json({data,AllAppointments});
  };
  export const getAppointmentById = async (req,res)=> {
    const {id} =req.params;
    const appointment= await Appointment.findById(id);
    res.status(StatusCodes.OK).json({appointment});        
   
};

export const getAppointment = async (req, res) => {
  let queryObject = {
    createdBy: req.user.userId  // You can add this filter if needed
  };
  const { month, year, day } = req.params;

  // Validate required parameters
  if (!month || !year || !day) {
    return res
      .status(400)
      .json({ message: 'month, year, and day are required to get appointments.' });
  }

  try {
    // 1. Retrieve appointments from the model
    const totalAppointments = await Appointment.countDocuments(queryObject); // Count all matching appointments
    const data = await Appointment.find(queryObject).sort('time'); // Find appointments and sort by createdAt descending

    // 2. Filter appointments for the requested date
    const filteredAppointments = data.filter((appointment) => {
      const appointmentDate = dayjs(appointment.date); // Create Day.js object from appointment date
      const requestedDate = dayjs(`${year}-${month}-${day}`); // Create Day.js object for requested date

      // Compare dates using 'day' unit (ignoring time)
      return appointmentDate.isSame(requestedDate, 'day');
    });

    res.status(200).json({ filteredAppointments, totalAppointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};



//---------------- read from file -----------------------------------------
// export const getAppointment = async (req, res) => {
//   const { month, year, day } = req.params; 
//   // Validate required parameters
//   if (!month || !year || !day) {
//     return res
//       .status(400)
//       .json({ message: 'month, year, and day are required to get appointments.' });
//   }
//   try {
//     // 1. Read appointments data
//     const appointments = await readAppointmentsData(); // Replace with your data access function
//         // 2. Filter appointments for the requested date
//     const filteredAppointments = appointments.filter((appointment) => {
//       const appointmentDate = dayjs(appointment.date); // Create Day.js object
//       const requestedDate = dayjs(`${year}-${month}-${day}`); // Create Day.js object
//       // Compare dates using 'day' unit (ignoring time)
//       return appointmentDate.isSame(requestedDate, 'day');
//     });
//     res.status(200).json(filteredAppointments);
//   } catch (error) {
//     console.error('Error fetching appointments:', error);
//     return res.status(500).json({ message: 'Internal server error.' });
//   }
// };
//------------------------------------------------------------------------------

export const deleteAppointment = async (req,res)=> {  
  const {id} =req.params;
 const removedAppointment = await Appointment.findByIdAndDelete(id)
 res.status(StatusCodes.OK).json({msg:'deleted this appointment',appointment:removedAppointment});
}; 