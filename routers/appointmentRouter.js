import express from "express";
import {
  deleteAppointment,
  getAllAppointments,
  postAppointment,
  updateAppointmentStatus,
} from "../controller/appointmentController.js";

import validateToken from "../middlewares/auth.js";

const router = express.Router();

router.use(validateToken);
router.post("/post", postAppointment);
router.get("/getall", getAllAppointments);
router.put("/update/:id", updateAppointmentStatus);
router.delete("/delete/:id", deleteAppointment);

export default router;
