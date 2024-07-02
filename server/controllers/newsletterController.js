import {StatusCodes} from 'http-status-codes';
import Newsletter from '../models/newsletterModel.js'

export const createNewsletter= async (req,res)=> {  
    req.body.createdBy = req.user.userId;      
    const newsletter = await Newsletter.create(req.body)  
       //   next();    
    res.status(StatusCodes.CREATED).json({newsletter, msg:'we have your mail !!!'});
};

// export const createNewsletter= async (req,res)=> {  
//   const userId = req.user.userId; // Assuming this is where you get the user ID   
//   const { email } = req.body;
//     if ( !email) {
//       res.status(400).json({ msg: 'please provide value' });
//       return;
//     } 
//     try {
//       const newsletter = await Newsletter.create({
//         email,
//         // time,
//         // date,
//         createdBy: userId, // Set createdBy property
//       });
//       res.status(StatusCodes.CREATED).json({ newsletter, msg: ' saved!' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ msg: 'An error occurred. Please try again.' });
//     }
//   const newsletter = await Newsletter.create(req.body)  
//       //  next();    
//   res.status(StatusCodes.CREATED).json({newsletter, msg:'we have your mail !!!'});
// };
export const getAllNewsletter= async (req,res)=>{       
    let queryObject= {  
      createdBy : req.user.userId      
          } ;
    
    let result = Newsletter.find(queryObject)
    result=result.sort('-createdAt');
    const totalMessages = await Newsletter.countDocuments(queryObject) ;
    let data = await result   
      res.status(200).json({data,totalMessages});
    };



// export const getAllNewsletter= async (req,res)=>{       
//   let queryObject= {  
//     createdBy : req.user.userId      
//         } ;
  
//   let result = Newsletter.find(queryObject)
//   result=result.sort('-createdAt');
//   const totalMessages = await Newsletter.countDocuments(queryObject) ;
//   let data = await result   
//     res.status(200).json({data,totalMessages});
//   };
  export const deleteAddress = async (req,res)=> {  
    const {id} =req.params;
   const removedAddress = await Newsletter.findByIdAndDelete(id)
   res.status(StatusCodes.OK).json({msg:'deleted this address',address:removedAddress});
  };
  export const deleteAllAddresses = async (req, res) => {
    try {
      // Delete all addresses using `deleteMany`
      const deletedCount = await Newsletter.deleteMany({});
  
      res.status(StatusCodes.OK).json({
        msg: `Successfully deleted ${deletedCount} addresses`,
      });
    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Failed to delete addresses",
      });
    }
  };
