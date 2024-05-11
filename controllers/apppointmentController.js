import ah from "express-async-handler";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

export const createAppointment = ah(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstName,
    doctor_lastName,
    hasVisited,
    address,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctor_firstName ||
    !doctor_lastName ||
    !address
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const doctor = await User.findOne({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
  });

  if (!doctor) {
    res.status(404);
    throw new Error("Doctor not found");
  }

  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    appointment_date,
    department,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    hasVisited,
    address,
    doctorId: doctor._id,
    patientId: req.user._id,
  });

  res.status(201).json({
    success: true,
    appointment,
    message: "Appointment created successfully",
  });
});

export const getAllAppointments = ah(async (req, res) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    success: true,
    appointments,
  });
});

export const updateAppointmentStatus = ah(async (req, res) => {
  const { id } = req.params;
  const appointment = await Appointment.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!appointment) {
    res.status(404);
    throw new Error("Appointment not found");
  }

  res.status(200).json({
    success: true,
    message: "Appointment status updated",
  });
});

export const deleteAppointment = ah(async (req, res) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);

  if (!appointment) {
    res.status(404);
    throw new Error("Appointment not found");
  }

  await appointment.deleteOne();
  res.status(200).json({
    success: true,
    message: "Appointment deleted",
  });
});
