import ah from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";
import { User } from "../models/userSchema.js";

export const patientRegister = ah(async (req, res) => {
  const { firstName, lastName, email, phone, dob, gender, password } = req.body;
  if (
    !firstName || 
    !lastName || 
    !email || 
    !phone || 
    !dob || 
    !gender || 
    !password
  ) {
    res.status(400);
    throw new Error("Please fill out the entire form!");
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    res.status(400);
    throw new Error("User already registered!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password: hashedPassword,
    role: "Patient",
  });
  res.json({ message: "User registered successfully!" });
});

export const login = ah(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill out the entire form!");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password incorrect");
  }
});

export const addNewAdmin = ah(async (req, res) => {
  const { firstName, 
    lastName, 
    email, 
    phone, 
    dob, 
    gender, 
    password 
  } = req.body;


  if (!firstName ||
     !lastName ||
     !email || 
     !phone || 
     !dob || 
     !gender || 
     !password
  ) {
    res.status(400);
    throw new Error("Please fill out the entire form!");
  }



  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    res.status(400);
    throw new Error("Admin with this email already exists!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password: hashedPassword,
    role: "Admin",
  });
  res.status(201).json({
    success: true,
    message: "New admin registered",
    admin,
  });
});

export const addNewDoctor = ah(async (req, res) => {
  const { firstName, 
    lastName, 
    email, 
    phone, 
    dob, 
    gender, 
    password, 
    doctorDepartment
  } = req.body;


  const { docAvatar } = req.files;

  if (!firstName || 
    !lastName || 
    !email || 
    !phone || 
    !dob || 
    !gender || 
    !password || 
    !doctorDepartment || 
    !docAvatar
  ) {
    res.status(400);
    throw new Error("Please fill out the entire form!");
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    res.status(400);
    throw new Error("Doctor with this email already exists!");
  }

  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    res.status(400);
    throw new Error("File format not supported!");
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary error");
    res.status(500);
    throw new Error("Failed to upload doctor avatar to Cloudinary");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password: hashedPassword,
    role: "Doctor",
    doctorDepartment,
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(201).json({
    success: true,
    message: "New doctor registered",
    doctor,
  });
});

export const getAllDoctors = ah(async (req, res) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});

export const getUserDetails = ah(async (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});
