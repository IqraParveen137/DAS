import express from 'express';
import { isAdmin, userAuth } from '../middlewares/authMiddlewares.js';
import {
  bookAppointment,
  cancelAppointment,
  getAllAppointments,
  getAppointmentDetails,
  getDoctorAppointments,
  getUserAppointmentDetails,
  getUserAppointments,
  updateAppointmentStatus,
} from '../controllers/appointmentController.js';
const router = express.Router();
//CREATE||POST
router.post('/create', userAuth, bookAppointment);
//GET ALL||GET
router.get('/get-all', userAuth, isAdmin, getAllAppointments);
//GET Details||GET
router.get('/get-details/:id', userAuth, getAppointmentDetails);
//Update-status||PATCH
router.patch('/update-status/:id', userAuth, updateAppointmentStatus);
//GET Details||GET
router.get('/get-user-appointments/:id', userAuth, getUserAppointments);
//GET user appointment DETAILS||GET
router.get(
  '/get-user-appointment-details/:id',
  userAuth,
  getUserAppointmentDetails,
);
//GET doctor appointments
router.get('/doctor/:id', getDoctorAppointments);
//CANCEL USER APPOINTMENT||POST
router.post('/cancel-appointment/:id', userAuth, cancelAppointment);
export default router;
