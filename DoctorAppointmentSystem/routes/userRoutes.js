import express from 'express';
import {
  getAllUsers,
  getLoginUser,
  getStats,
  getUserDetails,
  updatePassword,
  updateUser,
  userLogin,
  userSignup,
} from '../controllers/userController.js';
import upload from '../middlewares/multer.js';
import { isAdmin, userAuth } from '../middlewares/authMiddlewares.js';
const router = express();
//signup||POST
router.post('/signup', userSignup);
//LOGIN||POST
router.post('/login', userLogin);
//UPDATE PROFILE||PATCH
router.patch('/update/:id', userAuth, upload.single('image'), updateUser);
//UPDATE PASSWORD||PATCH
router.patch('/update-password/:id', userAuth, updatePassword);
//GET ALL USERS||GET
router.get('/get-all', userAuth, isAdmin, getAllUsers);
//GET ALL STATS||GET
router.get('/get-stats', userAuth, isAdmin, getStats);
//GET USER DETAILS||GET
router.get('/get-user/:id', userAuth, isAdmin, getUserDetails);
//GET Login USER||GET
router.get('/get-login-user/:id', userAuth, getLoginUser);
export default router;
