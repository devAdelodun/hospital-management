import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
    fisrtName:{
        type: String,
        required:[true, "First name is required"],
        minLength:[3, "First name should not be less than 3"]
    },

    
    lasttName:{
        type: String,
        required:[true, "Last name is required"],
        minLength:[3, "Last name should not be less than 3"]
    },

    email:{
        type: String,
        required:[true, "Email is required"],
        validate:[validator.isEmail, "Email provided is invalid"]
    },

    phone:{
        type: String,
        required:[true, "Phone number is required"],
        minLength:[11, "Phone number should not be less than 11"],
        maxLength:[11, "Phone number should not be more than 11"]
    },

    dob:{
        type: Date,
        required:[true, "DOB is required"],
    },

    gender:{
        type: String,
        required:[true, "Gender is required"],
        enum:["Male", "Female"]
    },

    appointment_date:{
        type: String,
        required:[true, "Appointment date is required"],
    },

    department:{
        type: String,
        required:[true, "Department is required"],
    },

    doctor:{
       fisrtName:{
        type: String,
        required:[true, "Doctor name required"]
       },

       lastName:{
        type: String,
        required:[true, "Doctor name required"]
       }
    },

    hasVisited:{
        type: Boolean,
        default: false,
    },

    address:{
        type: String,
        required:[true, "Address is required"],
    },

    doctorId: {
        type: mongoose.Schema.ObjectId,
        required:[true, "Doctor Id is invalid"]
    },

    patientId: {
        type: mongoose.Schema.ObjectId,
        required:[true, "Provide patient Id"],
    },

    status: {
        type:String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
    }

  }, {
    timestamps: true,
  }

)

const Appointment = mongoose.model("Appointment", appointmentSchema)

export default Appointment;