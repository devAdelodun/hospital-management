import express from "express";
import {
  addNewAdmin,
  addNewDoctor,
  getAllDoctors,
  getUserDetails,
  login,
  logoutAdmin,
  logoutPatient,
  patientRegister,
} from "../controller/userController.js";
import validateToken from "../middlewares/auth.js";

const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/addnew",validateToken, addNewAdmin);
router.post("/doctor/addnew",validateToken, addNewDoctor);
router.get("/doctors", validateToken, getAllDoctors);
router.get("/patient/me",validateToken, getUserDetails);
router.get("/admin/me", validateToken, getUserDetails);
router.get("/patient/logout", validateToken, logoutPatient);
router.get("/admin/logout", validateToken, logoutAdmin);

export default router;
