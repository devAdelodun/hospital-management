import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Fisrt name is required"],
        minLength: [3, "First name must not be less than three characters"], 
    },

    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minLength: [3, "Last name must not be less than three characters"],
    },

    email: {
        type: String,
        required: [true, "Please provide email"],
        validate: [validator.isEmail, "Please provide valid email"]
    },

    phone: {
        type: String,
        required: [true, "Please provide phone number"],
        minLength: [11, "Phone number must not be more than 11"],
        maxLength: [11, "Phone number must not be less than 11"],
    },

    message:{
        type: String,
        required: [true, "Please input message"],
        minLength: [10, "Message must not be less than 10 characters"]
    },
})


export const Message = mongoose.model("Message", messageSchema);