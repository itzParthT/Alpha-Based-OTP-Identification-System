import express from 'express';
const router = express.Router();
import UserController from '../controllers/userController.js'

// Public Routes
router.post('/login', UserController.userLogin)
router.post('/resend', UserController.userResend)
router.post('/verify', UserController.verifyOTP)


export default router