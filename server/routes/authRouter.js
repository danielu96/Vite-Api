import {Router} from 'express';
const router = Router();
import { login,logout,register} from '../controllers/authController.js';
// import {validateLogin,validateRegister } from '../middleware/validationMiddleware.js';
import {testUser} from '../controllers/testUser.js'
// import rateLimit from 'express-rate-limit';

// const apiLimit = rateLimit({
//     windowsMs: 15 * 60 * 1000,
//     max:3,
//     message:{msg:'IP rate limit, retry in 15 minutes'}
// });

router.post('/register',register);
router.post('/login',login);
router.get('/logout',logout);
router.post('/testUser',testUser)
export default router;