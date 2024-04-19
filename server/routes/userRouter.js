import {Router} from 'express';

import {  getAllUsers, getUser } from'../controllers/userController.js';



const router = Router();  
// router.post('/',createUser)
router.get('/',getAllUsers)
router.route('/:id').get(getUser)
export default router;