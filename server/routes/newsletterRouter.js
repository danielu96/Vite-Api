import {Router} from 'express';

import { createNewsletter, getAllNewsletter } from'../controllers/newsletterController.js';



const router = Router();  
router.post('/', createNewsletter)
router.get('/',getAllNewsletter)
export default router;