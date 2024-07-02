import Visit from "../models/VisitModel.js";
import {StatusCodes} from 'http-status-codes';
import dayjs from "dayjs";
import { nanoid } from "nanoid";

// Assuming jobs.json is a JSON file containing appointment data
import fs from 'fs/promises'; // For asynchronous file I/O


async function readAppointmentsData() {
  try {
    const data = await fs.readFile('tasks.json', 'utf-8');
    const appointments = JSON.parse(data); // Assuming data is valid JSON
    console.log(appointments); // Log the appointments data
    return appointments;
  } catch (error) {
    console.error('Error reading appointments data:', error);
    // Handle error gracefully (e.g., return empty array)
    return [];
  }
}

export const writeAppointmentsData = async (data) => {
  try {
    const jsonData = JSON.stringify(data, null, 2); // Stringify data with indentation
    await fs.writeFile('tasks.json', jsonData, 'utf-8');
    console.log('Appointments data written successfully!');
  } catch (error) {
    console.error('Error writing appointments data:', error);
  }
};



export const getAllVisits = async (req, res) => {
  let data = await readAppointmentsData();
  // await readAppointmentsData(data);
  res.json({ data });
};



// export const getAllVisits= async (req,res)=>{       
//   let queryObject= {  
//     // createdBy : req.user.userId      
//         } ;
  
//   let result = Visit.find(queryObject)
//   result=result.sort('-createdAt');
//   const totalVisits = await Visit.countDocuments(queryObject) ;
//   let data = await result   
//     res.status(200).json({data,totalVisits});
//   };


// export const getCalendar = async (req,res)=> {
//     const { year, month, day,name } = req.params;   
    
//     const visits = await Visit(year, month, day , req.params.name );
//         res.status(StatusCodes.OK).json({visits, name});  
//   };

  export const createVisit= async (req,res)=> {  
    // req.body.createdBy = req.user.userId;     
    const { name,date } = req.body;
      if ( !name) {
        res.status(400).json({ msg: 'please provide value' });
        return;
      } 
    const visit = await Visit.create(req.body)  
       //   next();    
    res.status(StatusCodes.CREATED).json({visit, msg:'visit save !!!'});
  };

  
  export const getVisit = async (req, res) => {
    const { month, year, day } = req.params;
  
    // Validate required parameters
    if (!month || !year || !day) {
      return res
        .status(400)
        .json({ message: 'month, year, and day are required to get appointments.' });
    }
  
    try {
      // 1. Read appointments data
      const appointments = await readAppointmentsData(); // Replace with your data access function
  
      // 2. Filter appointments for the requested date
      const filteredAppointments = appointments.filter((appointment) => {
        const appointmentDate = dayjs(appointment.date); // Create Day.js object
        const requestedDate = dayjs(`${year}-${month}-${day}`); // Create Day.js object
  
        // Compare dates using 'day' unit (ignoring time)
        return appointmentDate.isSame(requestedDate, 'day');
      });
  
      res.status(200).json(filteredAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  };

  // export const createReservation = async (req, res) => {
  //   const { author } = req.body;
  //   const { date } = req.body;
  //   const { time } = req.body;
  
  //   if (!author || !date || !time) {
  //     res.status(400).json({ msg: 'Please provide all details (author, date, time).' });
  //     return;
  //   }
  //   const appointments = await readAppointmentsData();
  //   const existingAppointment = appointments.find(
  //     (appointment) =>
  //       appointment.date === date && appointment.time === time && appointment.day === dayjs(date).format('DD')
  //   );
  
  //   if (existingAppointment) {
  //     res.status(409).json({ msg: 'This time slot is already booked.' });
  //     return;
  //   }
  
  //   const newAppointment = { id: nanoid(), author, date, time, day: dayjs(date).format('DD') };
  //   appointments = [...appointments, newAppointment];
  //   await writeAppointmentsData(appointments);
  //   res.json({ appointment: newAppointment, msg: 'Reservation created successfully.' });
  // };
  export const createReservation = async (req, res) => {
    const { author } = req.body;
    const { date } = req.body;
    const { time } = req.body;
  
    if (!author || !date || !time) {
      res.status(400).json({ msg: 'Please provide all details (author, date, time).' });
      return;
    }
  
    let appointments = await readAppointmentsData();
  
    // Ensure appointments is an array
    if (!Array.isArray(appointments)) {
      console.error('Error: appointments data is not an array');
      res.status(500).json({ msg: 'Internal server error.' });
      return;
    }
  
    const existingAppointment = appointments.find(
      (appointment) =>
        appointment.date === date && appointment.time === time && appointment.day === dayjs(date).format('DD')
    );
    const newAppointment = { id: nanoid(), author, date, time, day: dayjs(date).format('DD') };
    appointments = [...appointments, newAppointment];
    await writeAppointmentsData(appointments);
    res.json({ appointment: newAppointment, msg: 'Reservation created successfully.' });
  };
    
  




  
  