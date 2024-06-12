import {Router} from 'express';
import { createAppointment, deleteAppointment, getAllAppointments, getAppointment, getAppointmentById } from '../controllers/appointmentController.js';



const router = Router();  
router.post('/', createAppointment)
router.get('/',getAllAppointments)
router.get('/:id',getAppointmentById)
router.get('/:year/:month/:day',getAppointment)
router.delete('/:id',deleteAppointment)
export default router;