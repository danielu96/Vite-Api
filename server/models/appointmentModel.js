import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
       name:{
         type : String,
         }  ,
         date:{
            type: Date,
        },   
},

{ timestamps: true }
);


export default mongoose.model('Appointment', AppointmentSchema);