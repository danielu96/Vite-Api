import {Router} from 'express';

import {  getAllJobs,deleteJob, AddJob,EditJob } from'../controllers/jobsController.js';



const router = Router();  
// router.post('/',createUser)
router.get('/',getAllJobs)
router.post('/',AddJob)
router.route('/:id').delete(deleteJob).patch(EditJob)
// router.route('/:id').get(getUser)
export default router;