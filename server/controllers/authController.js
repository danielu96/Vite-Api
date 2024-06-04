import {StatusCodes} from  "http-status-codes";
import User from '../models/userModel.js';
import { comparePassword,hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.findOne({ email: req.body.email });

  if (user) {
    res.status(StatusCodes.BAD_REQUEST).json({
      msg: 'Użytkownik o podanym adresie e-mail już istnieje.',
    });
    return;
  }

  const verificationToken = generateVerificationToken(); // Generuj token weryfikacyjny

  try {
    await sendVerificationEmail({
      name: req.body.name,
      email: req.body.email,
      verificationToken,
    });

    const createdUser = await User.create(req.body);

    res.status(StatusCodes.CREATED).json({
      user: createdUser,
      msg: 'Sukces! Sprawdź swoją skrzynkę e-mail, aby zweryfikować konto',
    });
  } catch (error) {
    console.error('Błąd podczas rejestracji użytkownika:', error);

    if (error.code === 11000) { // Kod błędu duplikatu klucza
      res.status(StatusCodes.BAD_REQUEST).json({
        msg: 'Użytkownik o podanym adresie e-mail już istnieje.',
      });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        msg: 'Wystąpił błąd podczas rejestracji. Spróbuj ponownie później.',
      });
    }
  }
};

export const login = async (req,res)=>{
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
  res.status(StatusCodes.OK).json({user,token,msg:'logged in User successfully'})

};
export const logout = async (req, res)=>{
  res.cookie('token','logout', {
    httpOnly:true,
    expires:new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({msg:'user logged out'});
};