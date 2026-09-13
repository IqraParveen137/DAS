import express from 'express';
import { isAdmin, userAuth } from '../middlewares/authMiddlewares.js';
import {
  createMessage,
  deleteWebMessage,
  getAllMessages,
} from '../controllers/webMessageControllers.js';
const router = express.Router();
//CREATE MESSAGE||POST
router.post('/create', createMessage);
//GET ALL MESSAGES||GET
router.get('/get-all', getAllMessages);
//DELETE MESSAGE||DELETE
router.delete('/delete/:id', userAuth, isAdmin, deleteWebMessage);
export default router;
