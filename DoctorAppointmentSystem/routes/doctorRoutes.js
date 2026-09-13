import express from 'express';
import { isAdmin, userAuth } from '../middlewares/authMiddlewares.js';
import {
  addDoctor,
  deleteDoctor,
  doctorLogin,
  doctorSignup,
  getAllDoctors,
  getDoctorDetails,
  getDoctorStats,
  getLoginDoctor,
  updateAvailableStatus,
  updateDoctor,
  updateDoctorPassword,
} from '../controllers/doctorController.js';
import upload from '../middlewares/multer.js';
const router = express.Router();
//add doctor ||POST
router.post('/add', userAuth, isAdmin, upload.single('image'), addDoctor);
// doctor register
router.post('/signup', upload.single('image'), doctorSignup);

// doctor login
router.post('/login', doctorLogin);
//get all doctors ||GET
router.get('/get-all', getAllDoctors);
//get doctor details ||GET
router.get('/get-details/:id', getDoctorDetails);
//update doctor ||PATCH
router.patch('/update/:id', userAuth, upload.single('image'), updateDoctor);
//DELETE doctor ||DELETE
router.delete('/delete/:id', userAuth, isAdmin, deleteDoctor);
//GET||Get Login Doctor
router.get('/login-doctor/:id', userAuth, getLoginDoctor);
//doctorAvailableStatus ||PATCH
router.patch('/update-status/:id', userAuth, updateAvailableStatus);
// Doctor Dashboard Stats||GET
router.get('/stats/:id', getDoctorStats);
//update Password
router.patch('/update-password/:id', userAuth, updateDoctorPassword);
export default router;
