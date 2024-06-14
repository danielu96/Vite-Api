import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
       name:{
         type : String,
         }  ,
         date:{
            type: Date,
        },  
        time:{
          type: String,
      }, 
      createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        // required: true,
      }, 
},

{ timestamps: true }
);


export default mongoose.model('Appointment', AppointmentSchema);