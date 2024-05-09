import {Router} from 'express';

import { createNewsletter,deleteAddress, getAllNewsletter,deleteAllAddresses } from'../controllers/newsletterController.js';



const router = Router();  
router.post('/', createNewsletter)
router.get('/',getAllNewsletter)
router.delete('/',deleteAllAddresses)
router.route('/:id').delete(deleteAddress)
export default router;