import {StatusCodes} from 'http-status-codes';
import Newsletter from '../models/newsletterModel.js'

export const createNewsletter= async (req,res)=> {  
  // req.body.createdBy = req.user.userId;     
  const { email } = req.body;
    if ( !email) {
      res.status(400).json({ msg: 'please provide value' });
      return;
    } 
  const newsletter = await Newsletter.create(req.body)  
     //   next();    
  res.status(StatusCodes.CREATED).json({newsletter, msg:'we have your mail !!!'});
};

export const getAllNewsletter= async (req,res)=>{       
  let queryObject= {  
    // createdBy : req.user.userId      
        } ;
  
  let result = Newsletter.find(queryObject)
  result=result.sort('-createdAt');
  const totalMessages = await Newsletter.countDocuments(queryObject) ;
  let data = await result   
    res.status(200).json({data,totalMessages});
  };

