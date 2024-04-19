import {StatusCodes} from 'http-status-codes';
// import userList from '../../src/Mocks/mockData.js';
import User from '../models/userModel.js';

export const getUser = async (req,res)=> {
  const {id} =req.params;
  const user= await User.findById(id);
  res.status(StatusCodes.OK).json({user}); 
};
// export const getUser = async (req, res) => {
//     const { id } = req.params;
//     const user = User.find((user)=> user.id ===id);
//     if (!user){
//       return res.status(404).json({msg:`no user ${id}`});
//     }
//     res.status(StatusCodes.OK).json({user})
//   };

export const getAllUsers = async (req, res) => {
  const queryObject = {
    // createdBy : req.user.userId,
   
}
    // const { page = 1 } = req.query; // Default page to 1 if not specified

    // const pageSize = 4; // Set the page size to 3 results per page
    // const startIndex = (page - 1) * pageSize; // Calculate the start index
    // const filteredUserList = userList.slice(
    //   startIndex, startIndex + pageSize
    // );
    let result = User.find(queryObject) 
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.pageCount) || 3;
  const skip = (page - 1) * limit; 

  result = result.skip(skip).limit(limit);
  const totalUsers = await User.countDocuments(queryObject);
  let data = await result
  // const totalUsers = userList.length
    let meta = {
        "pagination": {
            "page": Number(req.query.page) || 1,
            "pageSize": 1,
            "pageCount": Math.ceil(totalUsers / limit),
            "total":totalUsers
            //  await Product.countDocuments(queryObject)
              ,
            // "numOfPages": Math.ceil(totalProducts / limit)
    
        },}


    res.status(StatusCodes.OK).json({ data,  meta});
};

