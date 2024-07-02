import mongoose from "mongoose";

const NewsletterSchema = new mongoose.Schema({
       email:{
         type : String,
         }     ,
         createdBy: {
          type: mongoose.Types.ObjectId,
          ref: 'User',
          // required: [true, 'Please provide user'],
        }
},
{ timestamps: true }
);


export default mongoose.model('Newsletter', NewsletterSchema);