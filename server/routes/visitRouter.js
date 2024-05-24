import {Router} from 'express';
import { getCalendar } from './controllers/visitController';






const router = Router();  
router.get('/visits/:year/:month',getCalendar)
export default router;