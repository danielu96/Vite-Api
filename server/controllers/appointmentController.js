import {StatusCodes} from 'http-status-codes';
import Appointment from '../models/appointmentModel.js'

export const createAppointment= async (req,res)=> {  
  // req.body.createdBy = req.user.userId;     
  const { name,date } = req.body;
    if ( !name) {
      res.status(400).json({ msg: 'please provide value' });
      return;
    } 
  const appointment = await Appointment.create(req.body)  
     //   next();    
  res.status(StatusCodes.CREATED).json({appointment, msg:'appointment save !!!'});
};

export const getAllAppointments= async (req,res)=>{       
  let queryObject= {  
    // createdBy : req.user.userId      
        } ;
  
  let result = Appointment.find(queryObject)
  result=result.sort('-createdAt');
  const totalMessages = await Appointment.countDocuments(queryObject) ;
  let data = await result   
    res.status(200).json({data,totalMessages});
  };
  export const getAppointmentById = async (req,res)=> {
    const {id} =req.params;
    const appointment= await Appointment.findById(id);
    res.status(StatusCodes.OK).json({appointment});        
   
};
// export const getAppointment = async (req, res) => {
//   const { date } = req.params;

//   // Modify the query to find appointments by date
//   const appointment = await Appointment.findOne({ date });

//   if (!appointment) {
//     // Handle case where no appointment found for the given date

//     // Return a consistent response structure:
//     return res.status(StatusCodes.OK).json({
//       appointment: null, // Indicate no appointment found
//       date: date // Include the selected date
//     });
//   }

//   // If an appointment is found, return the appointment details:
//   return res.status(StatusCodes.OK).json({ appointment });
// };
export const getAppointment = async (req, res) => {
  const { date } = req.params;  
  const appointments = await findAppointmentsByDate(date);
  let appointment = null;
  // Check if any appointments exist for the date
  if (appointments && appointments.length > 0) {
    // If appointments exist, pick the first one (modify logic if needed)
    appointment = appointments[0];
  }
  // Return a consistent response structure:
  return res.status(StatusCodes.OK).json({
    appointment, // Include the found appointment or null
    date, // Include the selected date
  });
};

// export const getAppointment = async (req, res) => {
//   const { date } = req.params; // Assuming date is sent in the URL parameter

//   // Modify the query to find appointments by date
//   const appointment = await Appointment.findOne({ date });

//   if (!appointment) {
//     // Handle case where no appointment found for the given date
//     return res.status(StatusCodes.OK).json({ msg: 'No appointment found', date });
//   }

//   res.status(StatusCodes.OK).json({ appointment });
// };
export const deleteAppointment = async (req,res)=> {  
  const {id} =req.params;
 const removedAppointment = await Appointment.findByIdAndDelete(id)
 res.status(StatusCodes.OK).json({msg:'deleted this appointment',appointment:removedAppointment});
};




 