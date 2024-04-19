import mongoose from 'mongoose';


const CommentsSchema = new mongoose.Schema(
  {
   
title: {
  type: String,
  trim: true,
  required: [true, 'Please provide product name'],
  maxlength: [150, 'Name can not be more than 150 characters'],
},
email:{
    type : String,
    }  ,

description:{
  type: String, 
},

 
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      // required: [true, 'Please provide user'],
    }
    
  },
  { timestamps: true }
);
export default  mongoose.model('Comments', CommentsSchema);