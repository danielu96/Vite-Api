import mongoose from "mongoose";

const NewsletterSchema = new mongoose.Schema({
       email:{
         type : String,
         }     
},
{ timestamps: true }
);


export default mongoose.model('Newsletter', NewsletterSchema);