import {StatusCodes} from  "http-status-codes";
import User from '../models/userModel.js';
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export const testUser = async (req,res)=>{
    const user = await User.findOne({email:req.body.identifier});
    const isValidUser=
    user && (await comparePassword(req.body.password, user.password));
  
    if(!isValidUser) throw new UnauthenticatedError('invalid credentials');
    const token = createJWT({userId:user._id,role:user.role});
    const oneDay = 1000 * 60*60*24;
    res.cookie('token', token, {
      httpOnly:true,
      expires:new Date(Date.now()+oneDay),
      secure:process.env.NODE_ENV === 'production',
    })
    res.status(StatusCodes.OK).json({user,token,msg:'tester logged in success '})
  
  };