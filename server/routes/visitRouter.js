import {Router} from 'express';
import { getVisit, createReservation, getAllVisits } from '../controllers/visitController.js';

const router = Router();  
router.get('/',getAllVisits)
router.get('/:year/:month/:day',getVisit );
router.post('/',createReservation)
export default router;